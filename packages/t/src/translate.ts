import { format } from "./format";
import {
  defaultPlurality,
  defaultGender,
  type Gender,
  type Plurality,
} from "@foo-i18n/base";
import type {
  GenderedMessage,
  PluralMessage,
  Translate,
  TranslateValueOptions,
} from "./types";

type TranslatedMessage = PluralMessage | GenderedMessage | string;

export const translate: Translate =
  (messages) =>
  (text, ...[values]) => {
    let translated: TranslatedMessage = messages[text] ?? text;

    if (translated && typeof translated !== "string" && values) {
      const plurality: Plurality =
        (values as TranslateValueOptions)?.plurality ?? defaultPlurality;
      const gender: Gender =
        (values as TranslateValueOptions)?.gender ?? defaultGender;

      translated = (translated as PluralMessage)?.[plurality] ?? translated;
      translated = (translated as GenderedMessage)?.[gender] ?? translated;
    }

    return format(translated as string, values);
  };
