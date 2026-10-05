/**
 * Locale parity check.
 *
 * Fails if any locale drifts from the default one: missing keys, stray keys,
 * mismatched ICU placeholders, or copy left byte-identical to English where a
 * translation is expected. Run with `npm run check:i18n`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const messagesDir = path.join(rootDir, 'messages');

const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'vi', 'ko', 'ja'];

/** Keys whose value is legitimately the same in every locale (brand names etc.). */
const SHARED_VALUE_KEYS = [
  /^nav\.items\.(stSoftware|devplus|aquax|conextAsia)$/,
  /^hero\.slides\.\w+\.tab$/,
  /^footer\.social\./,
  /^footer\.rights$/,
  // Technical terms and loanwords that stay in Latin script.
  /^capabilities\.tags\.(web|mobile|iot|aiot|lorawan|poc|rnd|coworking)$/,
  /^stories\.items\.devplusGlobalInternship\.title$/,
];

/**
 * Scripts a locale's prose is expected to use. Japanese accepts kanji as well as
 * kana — a compound noun like "代表事例" is perfectly valid with no kana at all.
 */
const SCRIPT_RULES = {
  ko: { name: 'Hangul', re: /[가-힯ᄀ-ᇿ]/ },
  ja: { name: 'Japanese script', re: /[぀-ヿ一-龯]/ },
};

const FOREIGN_SCRIPTS = [
  { name: 'Cyrillic', re: /[Ѐ-ӿ]/, allowedIn: [] },
  { name: 'Hangul', re: /[가-힯ᄀ-ᇿ]/, allowedIn: ['ko'] },
  { name: 'kana', re: /[぀-ヿ]/, allowedIn: ['ja'] },
];

function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, full));
    } else {
      out[full] = value;
    }
  }
  return out;
}

const placeholders = (value) =>
  [...String(value ?? '').matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

const isShared = (key) => SHARED_VALUE_KEYS.some((re) => re.test(key));

const load = (locale) =>
  flatten(JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf8')));

const base = load(DEFAULT_LOCALE);
const baseKeys = Object.keys(base);
const problems = [];

console.log(`${DEFAULT_LOCALE} baseline: ${baseKeys.length} keys\n`);

for (const locale of LOCALES) {
  const messages = load(locale);
  const keys = new Set(Object.keys(messages));
  const found = [];

  for (const key of baseKeys) {
    if (!keys.has(key)) found.push(`missing key: ${key}`);
  }
  for (const key of keys) {
    if (!baseKeys.includes(key)) found.push(`unexpected key: ${key}`);
  }
  for (const key of baseKeys) {
    if (keys.has(key) && placeholders(base[key]) !== placeholders(messages[key])) {
      found.push(`ICU placeholder mismatch: ${key}`);
    }
  }

  if (locale !== DEFAULT_LOCALE) {
    for (const key of baseKeys) {
      if (keys.has(key) && messages[key] === base[key] && !isShared(key)) {
        found.push(`untranslated (identical to ${DEFAULT_LOCALE}): ${key}`);
      }
    }
  }

  // A stray writing system is almost always a copy/paste slip.
  for (const [key, value] of Object.entries(messages)) {
    for (const script of FOREIGN_SCRIPTS) {
      if (!script.allowedIn.includes(locale) && script.re.test(String(value))) {
        found.push(`${script.name} characters in ${key}`);
      }
    }
  }

  // Prose in ko/ja should actually be in the local script.
  const rule = SCRIPT_RULES[locale];
  if (rule) {
    for (const [key, value] of Object.entries(messages)) {
      const text = String(value);
      const hasWords = /[A-Za-z]{4,}/.test(text);
      const looksLikeBrandOnly = /^[\w\s&().,'©{}+-]*$/.test(text);
      if (hasWords && !rule.re.test(text) && !looksLikeBrandOnly && !isShared(key)) {
        found.push(`no ${rule.name} in ${key}`);
      }
    }
  }

  if (found.length) {
    problems.push(locale);
    console.log(`✗ ${locale}: ${found.length} problem(s)`);
    for (const line of found.slice(0, 20)) console.log(`    ${line}`);
    if (found.length > 20) console.log(`    ... and ${found.length - 20} more`);
  } else {
    console.log(`✓ ${locale}: ${keys.size} keys, in parity`);
  }
}

if (problems.length) {
  console.error(`\nLocale check failed: ${problems.join(', ')}`);
  process.exit(1);
}
console.log('\nAll locales in parity.');
