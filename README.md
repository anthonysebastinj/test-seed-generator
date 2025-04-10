# 🧪 test-seed-generator

Generate fake test data (JSON or SQL) using simple YAML schemas. Ideal for testing, prototyping, and seeding databases with realistic mock data.

## 📦 Installation

Install the package globally via npm:

```bash
npm install -g test-seed-generator

🚀 Usage 

Run the CLI with a YAML config file and specify the output directory:

test-seed-generator --config ./schema.yaml --output ./seeds

📄 Example schema.yaml 

users:
  count: 5
  fields:
    id: uuid
    name: name.fullName
    email: internet.email
    role: [admin, user, guest]

📁 Output

Depending on the format selected, the tool will generate:

./seeds/users.json
or
./seeds/users.sql