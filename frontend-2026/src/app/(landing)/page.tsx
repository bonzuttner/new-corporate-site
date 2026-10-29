import type { Metadata } from 'next';
export const metadata:Metadata={title:'BonZuttner'};
export default function Page(){return <main style={{minHeight:'100svh',display:'grid',placeItems:'center',padding:'24px',boxSizing:'border-box',textAlign:'center'}}><div><h1 style={{margin:'0 0 24px'}}>BonZuttner</h1><p style={{margin:0}}><a href="/ja/">日本語</a> / <a href="/en/">English</a></p></div></main>;}
