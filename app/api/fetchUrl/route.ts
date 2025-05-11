import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json({ success: 0 });
    }

    // You might want to use libraries like 'metascraper' for better results
    // For now, using a simple fetch to demonstrate
    const response = await fetch(url);
    const html = await response.text();
    
    // Basic regex extraction for meta tags (not very robust)
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/i);
    
    return NextResponse.json({
      success: 1,
      meta: {
        title: titleMatch ? titleMatch[1] : '',
        description: descriptionMatch ? descriptionMatch[1] : '',
        image: imageMatch ? imageMatch[1] : '',
      },
      link: url,
    });
  } catch (error) {
    console.error('Error fetching URL metadata:', error);
    return NextResponse.json({ success: 0 });
  }
}