export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { query } = await req.json();
    
    // Fallback to VITE_ prefixed key if standard env var is missing during local dev
    const SERPAPI_KEY = process.env.SERPAPI_API_KEY || process.env.VITE_SERPAPI_KEY;

    if (!SERPAPI_KEY) {
      return new Response(JSON.stringify({ error: 'Configuration missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const params = new URLSearchParams({
      engine: 'google',
      q: query,
      api_key: SERPAPI_KEY,
      num: '8', // Top 8 results for context
    });

    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`SerpAPI error: ${response.statusText}`);
    }
    
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Search API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
