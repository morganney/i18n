"use server";
import type { AppLocale, AppMessages } from "./types";

export const loadMessages = async (locale: AppLocale) =>
  ({
    demo: (await import(`../messages/${locale}/demo.json`))
      .default as AppMessages["demo"],
  }) satisfies AppMessages;
