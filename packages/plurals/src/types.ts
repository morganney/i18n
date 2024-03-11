/**
 * Plurality is locale-dependent. Default: 'other'
 */
export type Plurality = "zero" | "one" | "two" | "few" | "many" | "other";

export type PluralFn = (p: number) => Plurality;

export type PluralRules = {
  ordinal: PluralFn;
  cardinal: PluralFn;
};
