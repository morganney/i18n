import { loadMessages } from "@/i18n/messages";
import AppTranslationProvider from "@/components/TranslationProvider";
import TranslateText from "@/components/TranslateText";
import type { AppLocale } from "@/i18n/types";

export default async function Page() {
  const locale: AppLocale = "en";
  const messages = await loadMessages(locale);

  return (
    <div className="py-10">
      <AppTranslationProvider locale={locale} messages={messages}>
        <TranslateText />
      </AppTranslationProvider>
    </div>
  );
}
