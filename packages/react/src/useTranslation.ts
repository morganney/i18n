import { useContext, useMemo } from "react"
import Context from './context';
import type { NamespaceMessages, TranslationContext, UseTranslate } from "./types";
import { StringKeys } from "@foo-i18n/t";


const useTranslation:UseTranslate<NamespaceMessages> = (ns) => {
  const ctx = useContext(Context) as TranslationContext<NamespaceMessages>;
  
  if (!ctx) {
    throw new Error('Missing TranslationProvider');
  }

  return useMemo(() => ({
    locale: ctx.locale,
    plural: ctx.plural,
    t: ctx.ns(ns as StringKeys<NamespaceMessages>)
  }), [ns, ctx]);
};

export default useTranslation;