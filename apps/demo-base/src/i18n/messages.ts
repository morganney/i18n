import type { AppLocale, AppMessages } from './types.js';

/**
 * Dynamically import mesages, this insures that no namespaces
 * are overlooked, and that all imported files are, again,
 * properly statically typed.
 */
export const loadMessages = async (locale: AppLocale) =>
  ({
    people: (await import(`../../messages/${locale}/people.json`))
      .default as AppMessages['people'],
  }) satisfies AppMessages;
