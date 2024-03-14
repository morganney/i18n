import type { Plurality } from '@i18n/base';

export type PluralFn = (p: number) => Plurality;

export type PluralRule = {
  ordinal: PluralFn;
  cardinal: PluralFn;
};
