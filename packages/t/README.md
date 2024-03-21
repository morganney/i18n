# Translator and formatter

Fully typed message formatter and translator.

## Usage

### Format strings

The `format` function takes 1 or 2 arguments, depending whether or not
the first argument, a `string`, contains placeholders. Placeholders
are tokens encapsulated within curly braces (e.g., `{foo}`).

Format strings may contain as many placeholders as required.

```ts
import { format } from "@foo-i18n/t";

// string without any placholder
format("Hello world");
// "Hello world"

// string with placholder requires 'name' to be provided as value
format("Hello {name}", { name: "John" });
// "Hello John"

// string with placholder(s) statically requires a second argument
// ts-error: Expected 2 arguments, but got 1
format("Current year: {year}");
// "Current year: ?year"

// missing placeholders are statically analysed
// ts-error: 'foo' does not exist in type '{ name: unknown; }'
format("Hello {name}", { foo: 1 });
// "Hello ?name"

// allow empty placeholder, but require second parameter
// ts-error: Expected 2 arguments, but got 1
format("Hello {}");
// "Hello ?"

// empty placeholders require empty placeholder value
// ts-error: Argument of type '{}' is not assignable to
//           parameter of type '{ "": unknown; }'.
format("Hello {}", {})
// "Hello ?"

// allow empty placeholders
format("Hello {}", { "": 1 }
// "Hello 1");

// multiple placeholders
format("Hello {name}, you have {messages} messages", {
  name: "John",
  messages: 10
});
// "Hello John, you have 10 messages"
```

### Translate strings

The `translate` function will create a translator (i.e., `t`)
function responsible of mapping a string to a translated one,
optionally supporting plurality or gender.

#### Basic

```ts
import { translate } from "./translate";

// NOTE: as const is required for auto-complete to work!
const messages = {
  "Hello world": "Bonjour monde",
  "Hello {name}": "Bonjour {name}",
  "Rewards: {points}": "Récompense: {points}",
} as const; 

const t = translate(messages);

t("Hello world");
// "Bonjour monde"

t("Hello {name}", { name: "John" });
// "Bonjour John"

// support any type, will be converted to string
t("Rewards: {points}", { points: 150 });
// "Récompense: 150"
```

#### Plurality

The `translator` function may receive an optional `plurality`
value indicating which string to use when plurality is found
in the messages. By default `"other"` is used.

See [`@foo-i18n/plurals](../plurals//README.md) for more information.

```ts
import { translate } from "./translate";

// NOTE: as const is required for auto-complete to work!
const messages = {
  "{items} items": {
    one: "1 item",
    other: "{items} items",
  },
} as const; 

const t = translate(messages);

// even if the translation string does not use the placeholder
// for "one" plurality, the property is still required.
t("{items} items", { items: 1, plurality: "one" });
// "1 item"

// specifying "other" is the same as not specifying any pluraity
t("{items} items", { items: 10, plurality: "other" });
// "10 items"
```

#### Gender

```ts
import { translate } from "./translate";

// NOTE: as const is required for auto-complete to work!
const messages = {
  "man": {
    f: "femme",
    m: "homme"
  }
} as const; 

const t = translate(messages);

// default gender
t('man');
// 'homme'

// specific gender
t('man', { gender: 'f' });
// 'femme'
```

#### Gender with Plurality

```ts
import { translate } from "./translate";

// NOTE: as const is required for auto-complete to work!
const messages = {
  "{count} cats": {
    one: {
      f: '1 chatte',
      n: "1 chat"  // neutral
    },
    other: {
      f: "{count} chattes",
      m: "{count} chats"  // masculin
    }
  },
} as const; 

const t = translate(messages);

// will use "other" plurality (default), feminin
t('{count} cats', { gender: 'f', count: 2 })
// '2 chattes'

// will use "other" plurality (default), masculin (default)
t('{count} cats', { count: 3 })
// '3 chats'

// will use "one" plurality, neutral (default)
t('{count} cats', { plurality: 'one', count: 1 })
// '1 chat'
```
