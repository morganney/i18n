/**
This script is used to build src/*.ts and src/rules/*.ts

This script is part of the npm package "@foo-i18n/plurals" and
should not be distributed in a non-development environment
as it depends on cldr-data to be installed as a dev-dependency.
*/

import fs from 'fs';

import prettier from 'prettier';

import pluralData from 'cldr-data/supplemental/plurals.json';
import ordinalData from 'cldr-data/supplemental/ordinals.json';

type Locale = string;
type PluralsType = 'ordinal' | 'cardinal';
type Plurality = (typeof PLURALITY)[number];
type PluralsTypeData =
  | (typeof pluralData.supplemental)['plurals-type-cardinal']
  | (typeof ordinalData.supplemental)['plurals-type-ordinal'];
type PluralFuncVars = Record<(typeof PARAMS)[number], string> & {
  [alias: string]: string;
};

type PluralFunctionExpr = string;
type RuleFunctionDef = {
  hasInput: boolean;
  name: string;
  fn: PluralFunctionExpr;
};

type PluralFunctionRuleName = Record<PluralsType, string>;

const OP_AND = / and /g;
const OP_OR = / or /g;
const OP_EQUAL = / = /g;
const OP_NOT_EQUAL = / != /g;
const MOD_ALIAS = /(\w) % (\d+)/g;
const EXPR = /(\w\d*?) (!?=) ((?:\d+(\.\.\d+)?,?)+)/g;
const EXPR_RANGE = /(\d+)\.\.(\d+)/;

const PLURALITY = ['zero', 'one', 'two', 'few', 'many', 'other'] as const;

/**
 * n = absolute value of p
 * i = integer digits of p.
 * v = number of visible fraction digits in p, with trailing zeros.
 * f = visible fractional digits in p, with trailing zeros.
 * t = visible fractional digits in p, without trailing zeros.
 * w = NOT USED BY CLDR AT THE MOMENT
 */
const PARAMS = ['n', 'i', 'v', 'f', 't' /*, 'w'*/] as const;

// cache parsed expressions
const exprCache: Record<string, ReturnType<typeof parseRule>> = {};

// the list of plural functions
const ruleFnDefs: Record<string, RuleFunctionDef> = {};
// the list of locale plural functions (ordinal, cardinal)
const pluralFnDefs: Record<Locale, Partial<PluralFunctionRuleName>> = {};

const defaultPluralFn = "() => 'other'" as const;

/**
Build all cardinal rules from CLDR data
*/
scanPluralData(pluralData.supplemental['plurals-type-cardinal'], 'cardinal');
/**
Build all ordinal rules from CLDR data
*/
scanPluralData(ordinalData.supplemental['plurals-type-ordinal'], 'ordinal');

// Write all rules
fs.mkdirSync('./src/rules', { recursive: true });

const ruleFiles = Object.values(ruleFnDefs).map((rule) =>
  createRuleFileContent(rule)
);

// Write all plural rules in locale
fs.mkdirSync('./src/locale', { recursive: true });

const pluralFiles = Object.entries(pluralFnDefs).map(([locale, plural]) =>
  createPluralFileContent(locale, plural)
);

const indexFile = createIndexFileContent();

Promise.all([...ruleFiles, ...pluralFiles, indexFile]).then(
  () => {
    console.log(`Generated ${ruleFiles.length} rules`);
    console.log(`Generated ${pluralFiles.length} plurals`);
    console.log('Done!');
  },
  (err) => {
    console.error('ERR:', err);
  }
);

// --------------------------------------------------------------------

async function createRuleFileContent(rule: RuleFunctionDef) {
  // TODO: remove (p:number) if function has no params
  const content = await prettier.format(
    [
      '/**',
      ' * Rule auto-generated from cldr-data',
      ' */',
      "import type { Plurality } from '@foo-i18n/base';",
      '',
      `export default (${rule.hasInput ? 'p:number' : ''}):Plurality => { ${rule.fn} };`,
    ].join('\n'),
    {
      parser: 'typescript',
      useTabs: false,
      tabWidth: 2,
    }
  );

  fs.writeFileSync(`./src/rules/${rule.name}.ts`, content);
}

async function createPluralFileContent(
  locale: Locale,
  plural: Partial<PluralFunctionRuleName>
) {
  const content = await prettier.format(
    [
      '/**',
      ` * Locale: ${locale}`,
      ' * Plural auto-generated from cldr-data',
      ' */',
      plural.cardinal
        ? `import cardinal from '../rules/${plural.cardinal}';`
        : null,
      plural.ordinal
        ? `import ordinal from '../rules/${plural.ordinal}';`
        : null,
      "import type { PluralRule } from '@foo-i18n/base';",
      '',
      'const pluralRule: PluralRule = {',
      `  ordinal${plural.ordinal ? '' : `: ${defaultPluralFn}`},`,
      `  cardinal${plural.cardinal ? '' : `: ${defaultPluralFn}`}`,
      '};',
      '',
      'export default pluralRule;',
    ]
      .filter((line) => line !== null)
      .join('\n'),
    {
      parser: 'typescript',
    }
  );

  await fs.writeFileSync(`./src/locale/${locale}.ts`, content);
}

function cleanLocale(locale: string) {
  return locale.replaceAll('-', '');
}

async function createIndexFileContent() {
  const locales = Object.keys(pluralFnDefs);
  const importLines = locales.map(
    (locale) =>
      `export { default as ${cleanLocale(locale)} } from './locale/${locale}';`
  );
  // const exportEntries = locales
  //   .map((locale) => `${cleanLocale(locale)}:_${cleanLocale(locale)}`)
  //   .join(', ');

  const content = await prettier.format(importLines.join('\n'), {
    parser: 'typescript',
  });

  fs.writeFileSync('./src/index.ts', content);
}

function scanPluralData(pluralData: PluralsTypeData, type: PluralsType) {
  Object.entries(pluralData).forEach(([locale, rawRules]) => {
    const ruleVars: Partial<PluralFuncVars> = {};
    const rules: Partial<Record<Plurality, string>> = {};
    let ruleHasInput = false;

    Object.entries(rawRules).forEach(([key, rawExpr]) => {
      const plurality = key.substring(key.lastIndexOf('-') + 1) as Plurality;
      const expr = rawExpr.substring(0, rawExpr.indexOf('@')).trim();

      if (!exprCache[expr]) {
        exprCache[expr] = parseRule(expr); // prevent recomputing this...
      }

      const { hasInput, vars, parsed } = exprCache[expr]!;

      rules[plurality] = parsed;
      ruleHasInput = ruleHasInput || hasInput;
      Object.assign(ruleVars, vars);
    });

    const fnParams = PARAMS.map((p) =>
      p in ruleVars ? `${p} = ${ruleVars[p]}` : null
    )
      .filter(Boolean)
      .concat(
        // add extra params
        Object.entries(ruleVars)
          .filter(([p]) => !PARAMS.includes(p as any))
          .map(([p, value]) => `${p} = ${value}`)
      )
      .join(', ');

    const fnExpr = PLURALITY.map((plurality) =>
      plurality in rules
        ? rules[plurality]
          ? `${rules[plurality]} ? '${plurality}' : `
          : `'${plurality}'`
        : null
    )
      .filter(Boolean)
      .join('');

    if (!ruleFnDefs[fnExpr]) {
      const name = `rule${Object.keys(ruleFnDefs).length + 1}`;
      const fn = `${fnParams ? `let ${fnParams}; ` : ''}return ${fnExpr};`;

      // TODO: add whether we require function (p:number) arg
      ruleFnDefs[fnExpr] = { hasInput: ruleHasInput, name, fn };
    }

    if (!pluralFnDefs[locale]) {
      pluralFnDefs[locale] = {};
    }

    pluralFnDefs[locale]![type] = ruleFnDefs[fnExpr]!.name;
  });
}

function parseRule(expr: string) {
  let requireP: boolean = false;
  let requireN: boolean = false;
  const vars: Partial<PluralFuncVars> = {};

  const parsed = expr
    .replace('i', () => {
      requireN = true;
      vars.i = 'Math.floor(n)||0';
      return 'i';
    })
    .replace('v', () => {
      requireP = true;
      vars.v = '((p+"").split(".")[1]||"").length';
      return 'v';
    })
    /**
     --- NOT USED BY CLDR AT THE MOMENT ---
    .replace('w', function () {
      vars.w = '((n+"").split(".")[1]||"").length';
      return 'w';
    })
    */
    .replace('f', () => {
      requireP = true;
      vars.f = 'Math.floor(Number((p+"").split(".")[1]))||0';
      return 'f';
    })
    .replace('t', () => {
      requireN = true;
      vars.t = 'Math.floor(Number((n+"").split(".")[1]))||0';
      return 't';
    })
    .replace(MOD_ALIAS, (match: string, v: string, mod: string) => {
      var alias = v + mod;

      if (v === 'n') {
        requireN = true;
      }

      if (!vars[alias]) {
        vars[alias] = match;
      }

      return alias;
    })
    .replace(EXPR, (_match: string, v: string, op: string, n: string) => {
      return n
        .split(',')
        .map((r: string) => {
          const m = r.match(EXPR_RANGE);
          //let buffer;

          if (m) {
            //for (buffer = [], m[1] = Math.floor(m[1], 10), m[2] = Math.floor(m[2], 10); m[1] <= m[2]; ++m[1]) {
            //  buffer.push(v + ' ' + op  + ' ' + m[1]);
            //}
            //return buffer.join(' || ');

            return (
              (op === '=' ? '' : '!') +
              '(' +
              v +
              ' >= ' +
              m[1] +
              ' && ' +
              v +
              ' <= ' +
              m[2] +
              ')'
            );
          } else {
            return v + ' ' + op + ' ' + r;
          }
        })
        .join(op === '=' ? ' || ' : ' && ');
    })
    .replace(OP_AND, ' && ')
    .replace(OP_OR, ' || ')
    .replace(OP_EQUAL, ' === ')
    .replace(OP_NOT_EQUAL, ' !== ');

  if (requireN || expr.indexOf('n') >= 0) {
    requireP = true;
    vars.n = 'Math.abs(p)||0';
  }

  return { hasInput: requireP, vars, parsed };
}
