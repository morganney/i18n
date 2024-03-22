const basePath = import.meta.env.BASE_URL;

export const getUrl = (path: string) =>
  `${basePath}${path}`.replaceAll('//', '/');
