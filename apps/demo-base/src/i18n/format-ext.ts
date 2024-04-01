import { format, type FormatText } from '@foo-i18n/t';

export type FormatString = 'Hello {name}' | 'Language : {lang}';

export type FormatValueOptions = {
  indent?: number;
};

// Could either be:
//   FormatText<string, FormatValueOptions>
//   FormatText<FormatString>
//   FormatText<FormatString, FormatValueOptions>
type FormatExt = FormatText<FormatString, FormatValueOptions>;

export const formatExt: FormatExt = (text, ...[values]) => {
  const margin = values?.indent ? ' '.repeat(values?.indent) : '';

  return margin + format(text, values as any);
};
