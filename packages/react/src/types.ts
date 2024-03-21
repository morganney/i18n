import type { LanguageCode } from "@foo-i18n/base/types";
import type { PluralRule } from "@foo-i18n/plurals/types";
import type { FormatText, NamespaceMessages, NamespaceTranslate, StringKeys, } from "@foo-i18n/t/types";

export type { LanguageCode } from "@foo-i18n/base/types";
export type { NamespaceMessages, NamespaceTranslate } from '@foo-i18n/t/types';
export type { PluralRule } from "@foo-i18n/plurals/types";

export type TranslationContext<M extends NamespaceMessages> = {
  readonly locale: LanguageCode;
  readonly ns: NamespaceTranslate<M extends string ? M : never>;
  readonly plural: PluralRule;
};

export type UseTranslate<M extends NamespaceMessages> = <NS extends StringKeys<M>, S extends StringKeys<M[NS]>>(
  ns: NS
) => {
  readonly locale: LanguageCode;
  readonly plural: PluralRule;
  readonly t: FormatText<S>;
};