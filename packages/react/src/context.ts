'use client';

import { createContext } from 'react';
import type { TranslationContext } from './types';
import type { NamespaceMessages } from '@foo-i18n/base';

const Context = createContext<TranslationContext<NamespaceMessages> | null>(
  null
);

export default Context;
