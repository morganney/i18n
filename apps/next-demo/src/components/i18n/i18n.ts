import useTranslation from "@foo-i18n/react/useTranslation";
import type { UseTranslate } from "@foo-i18n/react/types";
import type { AppMessages } from "./types";


export type UseAppTranslationContext = UseTranslate<AppMessages>;


export const useAppTranslation = useTranslation as UseAppTranslationContext;