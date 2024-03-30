import { translate } from './translate';

describe('Testing translate substitution', () => {
  const messages = {
    default: {
      'Hello world': 'Bonjour monde',
      'Hello {name}': 'Bonjour {name}',
      'Current year: {year}': 'Année courante: {year}',
    },

    // plural messages
    plurals: {
      '{items} items': {
        one: '1 item',
        other: '{items} items',
      },
    },

    // plural with gender
    pluralsGender: {
      '{count} cats': {
        one: {
          f: '1 chatte',
          n: '1 chat', // neutral
        },
        other: {
          f: '{count} chattes',
          m: '{count} chats', // masculin
        },
      },
    },

    // only gender
    genders: {
      man: {
        f: 'femme',
        m: 'homme',
      },
    },
  };

  it('should translate from messages', () => {
    const ns = translate(messages);
    const t = ns('default');

    const year = new Date().getFullYear();

    expect(t('Current year: {year}', { year })).toBe(`Année courante: ${year}`);

    expect(t('Hello world')).toBe('Bonjour monde');

    expect(t('Hello {name}', { name: 'John' })).toBe('Bonjour John');

    // @ts-expect-error - Will require a second parameter
    expect(t('Current year: {year}')).toBe('Année courante: ?year');

    // @ts-expect-error - Will require a second parameter
    expect(t('Hello {name}', { foo: 1 })).toBe('Bonjour ?name');
  });

  it('should translate plural message', () => {
    const ns = translate(messages);
    const t = ns('plurals');

    expect(t('{items} items', { items: 1, plurality: 'one' })).toBe('1 item');

    expect(t('{items} items', { items: 10, plurality: 'other' })).toBe(
      '10 items'
    );

    // defaults to "other" (default)
    expect(t('{items} items', { items: 99 })).toBe('99 items');
  });

  it('should translate gendered message', () => {
    const ns = translate(messages);
    const t = ns('genders');

    // default gender
    expect(t('man')).toBe('homme');

    // specific gender
    expect(t('man', { gender: 'f' })).toBe('femme');
  });

  it('should translate gendered plural message', () => {
    const ns = translate(messages);
    const t = ns('pluralsGender');

    // will use "other" plurality (default), feminin
    expect(t('{count} cats', { gender: 'f', count: 2 })).toBe('2 chattes');

    // will use "other" plurality (default), masculin (default)
    expect(t('{count} cats', { count: 3 })).toBe('3 chats');

    // will use "one" plurality, neutral (default)
    expect(t('{count} cats', { plurality: 'one', count: 1 })).toBe('1 chat');
  });
});
