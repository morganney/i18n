const idChars: string = 'ABCDEFGHJKMNPQRSTUVWXYZ';
const idCharLength = idChars.length;

export function generateUniqueId(prefix?: string, len: number = 6): string {
  let id = prefix ?? '';
  for (let i = 0; i < len; i++) {
    id += idChars[Math.floor(Math.random() * idCharLength)];
  }
  return id;
}
