// Module part of ../bundle.ts
import path from 'path';
import fs from 'fs/promises';

type PackageInfo = {
  name: string;
  version: string;
 }
 
 const packageVersions = async (packagePath: string) => {
  const packageMap = new Map<string, string>();
 
  const readDirectory = async (dirPath: string) => {
     const entries = await fs.readdir(dirPath, { withFileTypes: true });
 
     for (const entry of entries) {
       const fullPath = path.join(dirPath, entry.name);
 
       if (entry.isDirectory()) {
         await readDirectory(fullPath);
       } else if (entry.name === 'package.json') {
         const packageInfo: PackageInfo = JSON.parse(await fs.readFile(fullPath, 'utf-8'));
         packageMap.set(packageInfo.name, packageInfo.version);
       }
     }
  };
 
  await readDirectory(packagePath);
  
  return packageMap;
 };

export default packageVersions;