// Module part of ../bundle.ts
import path from 'path';
import fs from 'fs/promises';


const copyFile = async (src: string, dest: string, file: string) => {
  try {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    await fs.mkdir(dest, { recursive: true });
    await fs.copyFile(srcFile, destFile);
  } catch (err) {
    console.error(err);
  }
};

export default copyFile;