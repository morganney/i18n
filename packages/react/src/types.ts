import type { LanguageCode } from "@i18n/base/types";
import type { PluralRule } from "@i18n/plurals/types";
import type { FormatText, Messages, TranslateValueOptions } from "@i18n/t";

export type TranslationContext<M extends Messages> = {
  readonly locale: LanguageCode;
  readonly t: FormatText<M extends string ? M : never, TranslateValueOptions>;
  readonly plural: PluralRule;
};
