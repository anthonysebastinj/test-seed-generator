#!/usr/bin/env node

import { Command } from 'commander';
import { generateFromSchema } from '../lib/generator.js';

const program = new Command();
program
  .requiredOption('-c, --config <path>', 'Path to schema file')
  .requiredOption('-o, --output <path>', 'Output file or directory')
  .action((options) => {
    generateFromSchema(options.config, options.output);
  });

program.parse(process.argv);
