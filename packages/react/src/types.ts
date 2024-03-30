import type { Locale, PluralRule } from '@foo-i18n/base/types';
import type {
  NamespaceMessages,
  NamespaceTranslate,
  StringKeys,
  TranslateMessage,
} from '@foo-i18n/base';

export type {
  Locale,
  PluralRule,
  StringKeys,
  ExpandedMessages,
  NamespaceMessages,
  NamespaceTranslate,
} from '@foo-i18n/base/types';

export type TranslationContext<M extends NamespaceMessages> = {
  readonly locale: Locale;
  readonly ns: NamespaceTranslate<M extends string ? M : never>;
  readonly plural: PluralRule;
};

export type UseTranslation<M extends NamespaceMessages> = <
  NS extends StringKeys<M>,
  S extends StringKeys<M[NS]>,
>(
  ns: NS
) => {
  readonly locale: Locale;
  readonly plural: PluralRule;
  readonly t: TranslateMessage<S>;
};
