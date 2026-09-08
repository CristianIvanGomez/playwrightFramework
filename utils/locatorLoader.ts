// utils/locatorLoader.ts
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function loadLocators(fileName: string): any {
  const filePath = path.join(__dirname, '..', 'locators', fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents);
}