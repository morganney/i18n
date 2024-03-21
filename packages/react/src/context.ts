import { createContext } from "react";
import type { TranslationContext } from "./types";
import { NamespaceMessages } from "@foo-i18n/t";

const Context = createContext<TranslationContext<NamespaceMessages> | null>(null);

export default Context;