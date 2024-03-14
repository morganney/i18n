import { useMemo } from 'react';
import Context from './context';
import type { LanguageCode } from "@i18n/base";
import { translate, type Messages } from "@i18n/t";
import type { TranslationContext } from './types';
import type { PluralRule } from '@i18n/plurals/types';


export type TranslationProviderProps<M extends Messages> = {
  locale: LanguageCode;
  messages: M;
  plural: PluralRule
  children: React.ReactNode;
}


const TranslationProvider = <M extends Messages>({
  locale,
  messages,
  plural,
  children
}: TranslationProviderProps<M>) => {
  const t = useMemo(() => translate(messages), [messages]);
  const contextValue = useMemo<TranslationContext<M>>(() => ({
    get locale() { return locale; },
    get plural() { return plural; },    
    get t() { return t; },
  }), [t, locale, plural]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default TranslationProvider;