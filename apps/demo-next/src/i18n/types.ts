import type {
  Locale,
  ExpandedMessages,
  UseTranslation,
} from "@foo-i18n/react/types";

export type AppMessages = ExpandedMessages<{
  demo: typeof import("../messages/en/demo.json");
}>;

export type AppLocale = Extract<Locale, "en" | "fr">;

export type UseAppTranslation = UseTranslation<AppMessages>;
