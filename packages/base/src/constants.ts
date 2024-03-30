import type { Gender, PluralRule, Plurality } from './types';

/**
 * Plurality
 * - 'zero' : Depending on the language; where there's nothing.
 * - 'one' : Depending on the language; where there's an unicity in number.
 * - 'two' : Depending on the language; where there's a pair.
 * - 'few' : Depending on the language; where there's a small amount.
 * - 'many' : Depending on the language; where there's a fairly large amount.
 * - 'other' (default) : Any other specification goes here. This is the default langauge key; where we may find fractions, negative or otherwise unspecified or very large numbers. For any translation, this should always be specified at all times. This is also the fallback translation in case other language keys or not defined.
 */
export const pluralities = [
  'zero',
  'one',
  'two',
  'few',
  'many',
  'other',
] as const;

/**
 * Gender
 * - 'm' : masculine
 * - 'f' : feminine
 * - 'n' : (default) gender neutral
 */
export const genders = ['m', 'f', 'n'] as const;

export const defaultPlurality: Plurality = 'other' as const;

export const defaultGender: Gender = 'n' as const;

export const genderPriority: Gender[] = ['n', 'm', 'f'] as const;

export const defaultPlural: PluralRule = {
  ordinal: () => defaultPlurality,
  cardinal: () => defaultPlurality,
} as const;
