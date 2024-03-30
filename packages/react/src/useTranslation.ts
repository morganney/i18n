import { useContext, useMemo } from 'react';
import Context from './context';
import type {
  NamespaceMessages,
  TranslationContext,
  UseTranslation,
} from './types';
import type { StringKeys } from '@foo-i18n/base';

const useTranslation: UseTranslation<NamespaceMessages> = (ns) => {
  const ctx = useContext(Context) as TranslationContext<NamespaceMessages>;

  if (!ctx) {
    throw new Error('Missing TranslationProvider');
  }

  return useMemo(
    () => ({
      locale: ctx.locale,
      plural: ctx.plural,
      t: ctx.ns(ns as StringKeys<NamespaceMessages>),
    }),
    [ns, ctx]
  );
};

export default useTranslation;
