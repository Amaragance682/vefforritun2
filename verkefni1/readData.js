import fs from 'node:fs/promises';
import { access } from 'fs/promises';
import path from 'node:path';


// UHHH PARSAR I HTML FRA JSON?
export async function readJson(filePath) {
  console.log('starting to read', filePath);
  try {
    const data = await fs.readFile(path.resolve(filePath), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}



export async function validateIndexDataItem(data) {
  // Must have { title: string, file: string }
  if (
    !data ||
    typeof data.title !== 'string' ||
    typeof data.file !== 'string'
  ) {
    return false;
  }

  const filePath = path.join('data', data.file);
  try {
    await access(filePath);
    // If access() works, file exists → item is valid
    return true;
  } catch (error) {
    console.error(`Skipping "${data.title}" because ${data.file} not found`, error.message);
    return false;
  }
}