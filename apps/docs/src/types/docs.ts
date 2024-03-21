import type { MDXInstance } from 'astro';

export type DocumentationHeaders = {
  title: string;
  description: string;
  breadcrumbs: string[];
};

export type MDXDocumentInstance = MDXInstance<DocumentationHeaders>;
