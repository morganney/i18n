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
