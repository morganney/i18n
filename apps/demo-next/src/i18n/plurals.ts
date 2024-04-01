import { en, fr } from "@foo-i18n/plurals";
import type { AppLocale } from "./types";
import { PluralRule } from "@foo-i18n/react/types";

// only export what we need!
export const appPlurals: Record<AppLocale, PluralRule> = { en, fr };
