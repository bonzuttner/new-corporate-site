export type Locale = 'ja' | 'en' | 'ar';
export type JsonValue = string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue};
export interface PageRecord {
 locale: Locale;
 slug: string[];
 title: string;
 description: string;
 bodyAttributes: Record<string,string>;
 styles: string[];
 html: string;
 header: {tag:string;className:string;hasConsult:boolean;brandClass:string;navLabel:string;languageClass:string;languages:{locale:Locale;label:string;href:string;dataLanguage:string|null}[];retro:string|null} | null;
 footer: string;
 scripts: {src:string;module:boolean}[];
}
