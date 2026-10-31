import source from '@/generated/pages.json';
import ja from '@/content/locales/ja.json';
import en from '@/content/locales/en.json';
import ar from '@/content/locales/ar.json';
import type { Locale, PageRecord, JsonValue } from './types';
export const pages=source as unknown as Record<string,PageRecord>;
export const dictionaries={ja,en,ar} as unknown as Record<Locale, Record<string,JsonValue>>;
export function getDictionary(locale:Locale) {
 return Object.fromEntries(Object.entries(dictionaries[locale]).map(([key,value])=>[key,{[locale]:value}]));
}
