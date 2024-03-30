'use client';

import Context from './context';
import {
  type Locale,
  type NamespaceMessages,
  type PluralRule,
  defaultPlural,
} from '@foo-i18n/base';
import { translate } from '@foo-i18n/t';
import type { TranslationContext } from './types';

export type TranslationProviderProps<M extends NamespaceMessages> = {
  locale: Locale;
  messages: M;
  plural?: PluralRule;
  children: React.ReactNode;
};

const TranslationProvider = <M extends NamespaceMessages>({
  locale,
  messages,
  plural = defaultPlural,
  children,
}: TranslationProviderProps<M>) => {
  const ns = translate(messages);
  const contextValue = {
    get locale() {
      return locale;
    },
    get plural() {
      return plural;
    },
    get ns() {
      return ns;
    },
  } satisfies TranslationContext<M>;

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default TranslationProvider;
