import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  if (!process.env.STRAPI_API_TOKEN || !process.env.TENANT_ID) {
    console.error("Missing STRAPI_API_TOKEN or TENANT_ID");
    return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
  }

  try {
    const response = await axios.get('http://213.165.93.245/api/articles?populate=category&sort[0]=id:desc', {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "X-TENANT-ID": process.env.TENANT_ID,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching articles:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
