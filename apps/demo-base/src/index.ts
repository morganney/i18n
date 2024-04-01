import { genders } from '@foo-i18n/base';
import { translate } from '@foo-i18n/t';
import { loadMessages } from './i18n/messages.js';
import plurals from '@foo-i18n/plurals';
import { formatExt } from './i18n/format-ext.js';
import type { AppLocale } from './i18n/types.js';

const count_values = [0, 1, 10];
const languages: AppLocale[] = ['en', 'fr'];

const bootstrap = async () => {
  const messages_en = await loadMessages('en');
  const translatorEn = translate(messages_en);

  const messages_fr = await loadMessages('fr');
  const translatorFr = translate(messages_fr);

  const t: Record<AppLocale, ReturnType<typeof translatorEn>> = {
    en: translatorEn('people'),
    fr: translatorFr('people'),
  };

  for (const locale of languages) {
    for (const count of count_values) {
      for (const gender of genders) {
        const plurality = plurals[locale].cardinal(count);

        const params = {
          count,
          plurality,
          gender,
        };
        const text = t[locale]('There are {count} people', params);

        console.log('Locale', locale, params, text);
      }
    }
  }

  console.log(formatExt('Hello {name}', { name: 'John', indent: 4 }));
};

bootstrap();
