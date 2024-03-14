/**
 * Bundle script, preparing modules to be published.
 */
import path from 'path';

import packageVersions from './bundle/versions';
import bundlePackage from "./bundle/package";
import copyFile from './bundle/copy';

const rootPath = path.resolve(__dirname, path.join('..'));
const currentPath = process.cwd();
const packagesPath = path.join(rootPath, 'packages');
const buildPath = path.join(currentPath, 'build');
const readmeFile = 'README.md';
const licenseFile = 'LICENSE';


packageVersions(packagesPath).then(packages => {
  bundlePackage(currentPath, buildPath, packages);
  copyFile(currentPath, buildPath, readmeFile);
  copyFile(rootPath, buildPath, licenseFile);
});

