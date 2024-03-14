export type { LanguageCode } from 'iso-639-1';

/**
 * Gender
 * - 'm' : masculine
 * - 'f' : feminine
 * - 'n' : (default) gender neutral
 */
export type Gender = "m" | "f" | "n";

/**
 * Plurality
 * - 'zero' : Depending on the language; where there's nothing.
 * - 'one' : Depending on the language; where there's an unicity in number.
 * - 'two' : Depending on the language; where there's a pair.
 * - 'few' : Depending on the language; where there's a small amount.
 * - 'many' : Depending on the language; where there's a fairly large amount.
 * - 'other' (default) : Any other specification goes here. This is the default langauge key; where we may find fractions, negative or otherwise unspecified or very large numbers. For any translation, this should always be specified at all times. This is also the fallback translation in case other language keys or not defined.
 */
export type Plurality = "zero" | "one" | "two" | "few" | "many" | "other";
