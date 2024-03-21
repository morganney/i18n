"use client";

import TranslationProvider from "@foo-i18n/react/TranslationProvider";
import { en } from '@foo-i18n/plurals';
import TranslateText from "./TranslateText";
import type { NamespaceMessages }  from "@foo-i18n/react/types";

export type TranslateProps = {
  messages: NamespaceMessages
}

const Translate = ({ messages }: TranslateProps) => {
  return (
    <TranslationProvider locale="en" messages={messages} plural={en}>
      <TranslateText />
    </TranslationProvider>
  )
};

export default Translate;