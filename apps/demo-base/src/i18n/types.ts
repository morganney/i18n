import type { Locale, ExpandedMessages } from '@foo-i18n/base';

/**
 * Define the message namespaces and available strings
 */
export type AppMessages = ExpandedMessages<{
  people: typeof import('../../messages/en/people.json');
  // ...
}>;

/**
 * Instead of importing all locales, only allow a specific subset
 */
export type AppLocale = Extract<Locale, 'en' | 'fr'>;
