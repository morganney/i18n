"use client";

import { useAppTranslation } from "@/i18n/useAppTranslation";

const TranslateText = () => {
  const { locale, t, plural } = useAppTranslation("demo");
  const plurality = plural.ordinal(1);

  return (
    <>
      <div>Current locale: {locale}</div>
      <div>{t("Hello world")}</div>
      <div>{t("{count} items", { count: 123 })}</div>
      <div>{t("{count} items", { count: 1, plurality })}</div>
    </>
  );
};

export default TranslateText;
