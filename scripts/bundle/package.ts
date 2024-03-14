// Module part of ../bundle.ts
import path from 'path';
import fs from 'fs/promises';

type JSON = Record<string, unknown>;

const pkgFile = 'package.json';
const newLine = '\n';

// List of valid non-dev properties of package.json
// Sourced from https://docs.npmjs.com/cli/v8/configuring-npm/package-json
const copyProps = new Set([
  'author',
  'bin',
  'browser',
  'bugs',
  'config',
  'contributors',
  'cpu',
  'dependencies',
  'description',
  'directories',
  'engines',
  'exports',
  'files',
  'funding',
  'homepage',
  'keywords',
  'license',
  'main',
  'maintainers',
  'man',
  'name',
  'optionalDependencies',
  'os',
  'overrides',
  'peerDependencies',
  'peerDependenciesMeta',
  'private',
  'publishConfig',
  'repository',
  'version',
]);


const bundlePackage = async (src: string, dest: string, packages: Map<string, string>) => {
  const pkgSource = path.join(src, pkgFile);
  const pkgDest = path.join(dest, pkgFile);

  const source = await fs.readFile(pkgSource, 'utf8');
  const parsed = JSON.parse(source) as JSON;

  const result:JSON = {
    name: '',
    description: '',
  };
  for (const [key, value] of Object.entries(parsed)) {
    if (copyProps.has(key)) {
      result[key] = value;
    }
  }

  // fix export/module paths
  if (result.exports) {
    const _exports = result.exports as any;
    for (const [alias, path] of Object.entries(_exports)) {
      _exports[alias] = (path as string).replace('/build', '');
    }
  }
  if (result.main) {
    result.main = (result.main as string).replace('/build', '');
  }
  if (result.types) {
    result.types = (result.types as string).replace('/build', '');
  }

  // fix dependencies version
  if (result.dependencies) {
    const _dependencies = result.dependencies as any;
    for (const [pkgName, version] of Object.entries(_dependencies)) {
      if ((version as string).startsWith('workspace:')) {
        // TODO: find package version
      }
    }
  }

  const output = JSON.stringify(result, null, 2) + newLine;

  await fs.mkdir(dest, { recursive: true });
  await fs.writeFile(pkgDest, output);
};

export default bundlePackage;