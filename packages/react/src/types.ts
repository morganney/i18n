import type { LanguageCode } from "@foo-i18n/base/types";
import type { PluralRule } from "@foo-i18n/plurals/types";
import type { FormatText, Messages, TranslateValueOptions } from "@foo-i18n/t/types";

export type { LanguageCode } from "@foo-i18n/base/types";
export type { Messages } from '@foo-i18n/t/types';
export type { PluralRule } from "@foo-i18n/plurals/types";

export type TranslationContext<M extends Messages> = {
  readonly locale: LanguageCode;
  readonly t: FormatText<M extends string ? M : never, TranslateValueOptions>;
  readonly plural: PluralRule;
};
