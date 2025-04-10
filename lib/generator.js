import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { faker } from '@faker-js/faker';

let store = {}; // stores generated data for reference resolution

const fakerMap = {
  uuid: () => faker.string.uuid(),
  'name.fullName': () => faker.person.fullName(),
  'internet.email': () => faker.internet.email(),
  'lorem.sentence': () => faker.lorem.sentence(),
  'lorem.paragraphs': () => faker.lorem.paragraphs(),
};

function generateField(value, collectionName) {
  if (Array.isArray(value)) {
    // e.g. role: [admin, user, guest]
    return () => faker.helpers.arrayElement(value);
  }

  if (typeof value === 'string') {
    if (value.startsWith('ref(')) {
      // Handle reference like ref(users.id)
      const [refCollection, refField] = value.match(/\((.*?)\)/)[1].split('.');
      return () => {
        const refData = store[refCollection];
        return faker.helpers.arrayElement(refData)[refField];
      };
    }

    // Faker direct mapping
    const fakerFn = fakerMap[value];
    if (fakerFn) return fakerFn;
  }

  return () => null;
}

export function generateFromSchema(configPath, outputPath) {
  const ext = path.extname(configPath);
  const raw = fs.readFileSync(configPath, 'utf-8');
  const schema = ext === '.yaml' || ext === '.yml' ? yaml.load(raw) : JSON.parse(raw);

  Object.entries(schema).forEach(([collectionName, config]) => {
    const { count, fields } = config;
    const items = [];

    for (let i = 0; i < count; i++) {
      const item = {};

      Object.entries(fields).forEach(([fieldName, fieldType]) => {
        const gen = generateField(fieldType, collectionName);
        item[fieldName] = gen();
      });

      items.push(item);
    }

    store[collectionName] = items;

    // Output to JSON file
    const outFile = path.join(outputPath, `${collectionName}.json`);
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(outFile, JSON.stringify(items, null, 2));
    console.log(`✅ Generated ${items.length} ${collectionName} → ${outFile}`);
  });
}
