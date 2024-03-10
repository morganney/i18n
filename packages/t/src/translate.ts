import { format } from "./format";
import type { ExtractPlaceholders, Gender, MaybeParam, Plural } from "./types";

export type TranslateValueOptions = {
  gender?: Gender;
  plurality?: number;
};

export type TranslateMessage<Message extends string> = <S extends Message>(
  text: S,
  ...[values]: MaybeParam<{ [K in ExtractPlaceholders<S>]: unknown } & TranslateValueOptions>
) => string;

export type PluralMessage = Record<Plural, GenderedMessage | string>;

export type GenderedMessage = Record<Gender, string>;

export type Messages = {
  [key: string]: PluralMessage | GenderedMessage | string;
};

export type PluralHandler = (plurality: number) => Plural;

export type Translate = <M extends Messages, K = keyof M>(
  messages: M,
  plurals: PluralHandler
) => TranslateMessage<K extends string ? K : never>;

export const translate: Translate =
  (messages, plurals) =>
  (text, ...[values]) => {
    let translated: unknown = messages[text] ?? text;

    if (translated && typeof translated !== "string" && values) {
      if (values.plurality !== undefined) {
        const plural = plurals(values.plurality);

        translated = (translated as PluralMessage)?.[plural] ?? translated;
      } else {
        translated = (translated as PluralMessage)?.other ?? translated;
      }

      if (values.gender) {
        translated =
          (translated as GenderedMessage)?.[values.gender] ?? translated;
      } else {
        translated = (translated as GenderedMessage)?.n ?? translated;
      }
    }

    return format(translated as string, values);
  };
