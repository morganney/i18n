"use server";
import type { AppLocale, AppMessages } from "./types";

export const loadMessages = async (
  locale: AppLocale,
): Promise<AppMessages> => ({
  demo: (await import(`../../messages/${locale}/demo.json`)).default,
});