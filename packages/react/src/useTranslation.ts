import { useContext } from "react"
import Context from './context';
import { Messages } from "@foo-i18n/t";
import { TranslationContext } from "./types";

const useTranslation = <M extends Messages>() => {
  const ctx = useContext(Context) as TranslationContext<M>;

  if (!ctx) {
    throw new Error('Missing TranslationProvider');
  }

  return ctx;
};

export default useTranslation;