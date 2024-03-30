import { format } from './format';
import {
  defaultPlurality,
  genderPriority,
  Translate,
  TranslateValueOptions,
  type Gender,
  type Plurality,
} from '@foo-i18n/base';

export const translate: Translate =
  (messages) =>
  (ns) =>
  (text, ...[values]) => {
    let translated: any = messages[ns]?.[text] ?? text;

    // plurality?
    if (translated && typeof translated !== 'string') {
      const plurality: Plurality =
        (values as TranslateValueOptions)?.plurality ?? defaultPlurality;

      translated = translated?.[plurality] ?? translated;
    }

    // gender?
    if (translated && typeof translated !== 'string') {
      const gender: Gender | undefined =
        (values as TranslateValueOptions)?.gender ??
        genderPriority.find((gender) => gender in translated);

      translated = gender ? translated[gender] : translated;
    }

    return format(translated as string, values);
  };
