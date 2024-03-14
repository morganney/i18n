import type { Gender, Plurality } from '@i18n/base';


export type ExtractPlaceholders<T extends string> = string extends T
  ? never
  : T extends `${infer _Pre}{${infer Name}}${infer Rest}`
    ? Name | ExtractPlaceholders<Rest>
    : never;

type IfEql<T extends string, U extends string> = [T] extends [U] ? T : never;

export type ExtractTags<T extends string> = string extends T
  ? never
  : T extends `${infer _Pre}<${infer StartTag}>${infer _Content}</${infer EndTag}>${infer Rest}`
    ? IfEql<StartTag, EndTag> | ExtractTags<Rest>
    : never;

type RequiredKeys<T> = {
  [K in keyof T]-?: NonNullable<unknown> extends Pick<T, K> ? never : K;
} extends { [_ in keyof T]-?: infer U }
  ? U
  : never;

export type MaybeParam<O extends Record<string, unknown>> = [
  RequiredKeys<O>,
] extends [never]
  ? [values?: O]
  : [values: O];

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;


export type TranslateValueOptions = {
  gender?: Gender;
  plurality?: Plurality;
};


// Define a type for all plural forms except "other", and make it optional
type OptionalPluralMessage = Partial<Record<Exclude<Plurality, "other">, GenderedMessage | string>>;

// Define a type for "other", and make it required
type RequiredPluralMessage = Required<Record<"other", GenderedMessage | string>>;

export type PluralMessage = OptionalPluralMessage & RequiredPluralMessage;

export type GenderedMessage = Record<Gender, string>;

export type Messages = {
  [key: string]: PluralMessage | GenderedMessage | string;
};

/**
 * 
 */
export type FormatText<S extends string = string, ValueOptions = {}> = <T extends S>(
  text: T,
  ...[values]: MaybeParam<{ [K in ExtractPlaceholders<T>]: unknown }> & ValueOptions
) => string;

export type TranslateMessage<Message extends string> = FormatText<Message, TranslateValueOptions>;
// export type TranslateMessage<Message extends string> = <S extends Message>(
//   text: S,
//   ...[values]: MaybeParam<
//     { [K in ExtractPlaceholders<S>]: unknown } & TranslateValueOptions
//   >
// ) => string;

export type Translate = <M extends Messages, K = keyof M>(
  messages: M
) => TranslateMessage<K extends string ? K : never>;