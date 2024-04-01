"use client";
import TranslationProvider from "@foo-i18n/react/TranslationProvider";
import { appPlurals } from "@/i18n/plurals";
import type { AppLocale, AppMessages } from "@/i18n/types";

export type AppTranslationProviderProps = {
  locale: AppLocale;
  messages: AppMessages;
  children: React.ReactNode;
};

const AppTranslationProvider = ({
  locale,
  messages,
  children,
}: AppTranslationProviderProps) => {
  const plural = appPlurals[locale];

  return (
    <TranslationProvider locale={locale} messages={messages} plural={plural}>
      {children}
    </TranslationProvider>
  );
};

export default AppTranslationProvider;
