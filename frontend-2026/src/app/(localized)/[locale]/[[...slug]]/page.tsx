import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageExperience } from '@/components/PageExperience';
import { pages, getDictionary } from '@/lib/pages';
export const dynamicParams=false;
type Params={locale:string;slug?:string[]};
export function generateStaticParams(){return Object.values(pages).map(page=>({locale:page.locale,slug:page.slug}));}
async function record(params:Promise<Params>){const {locale,slug=[]}=await params;const page=pages[`${locale}/${slug.join('/')}`];if(!page)notFound();return page;}
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{const page=await record(params);return {title:page.title,description:page.description};}
export default async function Page({params}:{params:Promise<Params>}){
 const page=await record(params);
 return <>{page.styles.map(href=><link key={href} rel="stylesheet" href={href}/>)}<PageExperience page={page} dictionary={getDictionary(page.locale)}/></>;
}
