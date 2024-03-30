import { pluralities, genders } from './constants';
import locales from './locales';

/**
 * 2-letter and 3-letter language codes
 */
export type Locale = (typeof locales)[number];

/**
 * Gender
 * - 'm' : masculine
 * - 'f' : feminine
 * - 'n' : (default) gender neutral
 */
export type Gender = (typeof genders)[number];

/**
 * Plurality
 * - 'zero' : Depending on the language; where there's nothing.
 * - 'one' : Depending on the language; where there's an unicity in number.
 * - 'two' : Depending on the language; where there's a pair.
 * - 'few' : Depending on the language; where there's a small amount.
 * - 'many' : Depending on the language; where there's a fairly large amount.
 * - 'other' (default) : Any other specification goes here. This is the default langauge key; where we may find fractions, negative or otherwise unspecified or very large numbers. For any translation, this should always be specified at all times. This is also the fallback translation in case other language keys or not defined.
 */
export type Plurality = (typeof pluralities)[number];

/**
 * Function receiving a number, returning what plurality should be used.
 */
export type PluralFn = (p: number) => Plurality;

/**
 * Different plurality rules whether it is an order (cardinal, e.g., rank) value
 * or a distinct numeric (ordinal, e.g., quantity) value
 */
export type PluralRule = {
  ordinal: PluralFn;
  cardinal: PluralFn;
};

// type IfEql<T extends string, U extends string> = [T] extends [U] ? T : never;

// type ExtractTags<T extends string> = string extends T
//   ? never
//   : T extends `${infer _Pre}<${infer StartTag}>${infer _Content}</${infer EndTag}>${infer Rest}`
//     ? IfEql<StartTag, EndTag> | ExtractTags<Rest>
//     : never;

// type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type ExtractPlaceholders<T extends string> = string extends T
  ? never
  : T extends `${infer _Pre}{${infer Name}}${infer Rest}`
    ? Name | ExtractPlaceholders<Rest>
    : never;

type RequiredKeys<T> = {
  [K in keyof T]-?: NonNullable<unknown> extends Pick<T, K> ? never : K;
} extends { [_ in keyof T]-?: infer U }
  ? U
  : never;

type MaybeParam<O extends Record<string, unknown>> = [RequiredKeys<O>] extends [
  never,
]
  ? [values?: O]
  : [values: O];

// Utility type to return only the keys of a type which as strings
export type StringKeys<T, K = keyof T> = K extends string ? K : never;

// Utility type to show the complete structure of a type
export type ExpandedMessages<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandedMessages<O[K]> }
    : never
  : T;

export interface TranslateValueOptions {
  gender?: Gender;
  plurality?: Plurality;
}

// message specifying only f and m genders
type BinaryGenderMessage = Record<Exclude<Gender, 'n'>, string>;

// message with gender inclusive
type NonBinaryGenderMessage = Partial<BinaryGenderMessage> &
  Record<Extract<Gender, 'n'>, string>;

export type GenderedMessage = BinaryGenderMessage | NonBinaryGenderMessage;

// messages with all plural forms except "other", and make it optional
type OptionalPluralMessage = Partial<
  Record<Exclude<Plurality, 'other'>, GenderedMessage | string>
>;

// messages requiring "other"
type RequiredPluralMessage = Required<
  Record<Extract<Plurality, 'other'>, GenderedMessage | string>
>;

export type PluralMessage = OptionalPluralMessage & RequiredPluralMessage;

export type Messages = {
  [key: string]: PluralMessage | GenderedMessage | string;
};

export type NamespaceMessages = {
  [key: string]: Messages;
};

export type FormatText<S extends string = string, ValueOptions = {}> = <
  T extends S,
>(
  text: T,
  ...[values]: MaybeParam<
    { [K in ExtractPlaceholders<T>]: unknown } & ValueOptions
  >
) => string;

export type TranslateMessage<S extends string> = FormatText<
  S,
  TranslateValueOptions
>;

export type NamespaceTranslate<M extends NamespaceMessages> = <
  NS extends StringKeys<M>,
  S extends StringKeys<M[NS]>,
>(
  ns: NS
) => TranslateMessage<S>;

export type Translate = <M extends NamespaceMessages>(
  messages: M
) => NamespaceTranslate<M>;
