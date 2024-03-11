import { format } from "./format";
import type {
  ExtractPlaceholders,
  Gender,
  MaybeParam,
  Plurality,
} from "./types";

export type TranslateValueOptions = {
  gender?: Gender;
  plurality?: Plurality;
};

export type TranslateMessage<Message extends string> = <S extends Message>(
  text: S,
  ...[values]: MaybeParam<
    { [K in ExtractPlaceholders<S>]: unknown } & TranslateValueOptions
  >
) => string;

// Define a type for all plural forms except "other", and make it optional
type OptionalPluralMessage = Partial<Record<Exclude<Plurality, "other">, GenderedMessage | string>>;

// Define a type for "other", and make it required
type RequiredPluralMessage = Required<Record<"other", GenderedMessage | string>>;

export type PluralMessage = OptionalPluralMessage & RequiredPluralMessage;

export type GenderedMessage = Record<Gender, string>;

export type Messages = {
  [key: string]: PluralMessage | GenderedMessage | string;
};

export type Translate = <M extends Messages, K = keyof M>(
  messages: M
) => TranslateMessage<K extends string ? K : never>;

export const translate: Translate =
  (messages) =>
  (text, ...[values]) => {
    let translated: unknown = messages[text] ?? text;

    if (translated && typeof translated !== "string" && values) {
      translated =
        (translated as PluralMessage)?.[values?.plurality ?? "other"] ??
        translated;

      translated =
        (translated as GenderedMessage)?.[values?.gender ?? "n"] ?? translated;
    }

    return format(translated as string, values);
  };
