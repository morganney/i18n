import type { Gender, Plurality } from "@foo-i18n/base";


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

export type StringKeys<T, K = keyof T> = K extends string ? K : never;

export type TranslateValueOptions = {
  gender?: Gender;
  plurality?: Plurality;
};

// message specifying only f and m genders
type BinaryGenderMessage = Record<Exclude<Gender, "n">, string>;

// message with gender inclusive
type NonBinaryGenderMessage = Partial<BinaryGenderMessage> &
  Record<Extract<Gender, "n">, string>;

export type GenderedMessage = BinaryGenderMessage | NonBinaryGenderMessage;

// messages with all plural forms except "other", and make it optional
type OptionalPluralMessage = Partial<
  Record<Exclude<Plurality, "other">, GenderedMessage | string>
>;

// messages requiring "other"
type RequiredPluralMessage = Required<
  Record<Extract<Plurality, "other">, GenderedMessage | string>
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

export type Translate = <
  M extends NamespaceMessages
>(
  messages: M
) => NamespaceTranslate<M>;
