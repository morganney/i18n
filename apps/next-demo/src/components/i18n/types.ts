import type { LanguageCode } from "@foo-i18n/react/types";

export type AppMessages = {
  demo: typeof import("../../messages/en/demo.json");
};

export type AppLocale = Extract<LanguageCode, "en">;
