"use client";

import { useMemo } from 'react';
import Context from './context';
import type { LanguageCode } from "@foo-i18n/base";
import { translate, type NamespaceMessages } from "@foo-i18n/t";
import type { TranslationContext } from './types';
import type { PluralRule } from '@foo-i18n/plurals/types';


export type TranslationProviderProps<M extends NamespaceMessages> = {
  locale: LanguageCode;
  messages: M;
  plural: PluralRule
  children: React.ReactNode;
}


const TranslationProvider = <M extends NamespaceMessages>({
  locale,
  messages,
  plural,
  children
}: TranslationProviderProps<M>) => {
  const ns = useMemo(() => translate(messages), [messages]);
  const contextValue = useMemo<TranslationContext<M>>(() => ({
    get locale() { return locale; },
    get plural() { return plural; },    
    get ns() { return ns; },
  }), [ns, locale, plural]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default TranslationProvider;