import path from 'path';

const root = path.resolve('..', '..');

export const relativeToRoot = (file: string) => path.relative(root, file);
