
interface SearchResult {
    title: string;
    link: string;
    snippet: string;
    source: string;
    date?: string;
    favicon?: string;
    position: number;
}

export interface SearchResponse {
    results: SearchResult[];
    error?: string;
}

export async function searchWeb(query: string): Promise<SearchResponse> {
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`Search API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const results = (data.organic_results || []).map((result: any, index: number) => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet,
            source: result.source || new URL(result.link).hostname,
            date: result.date,
            favicon: result.favicon, // SerpApi often provides this
            position: index + 1
        }));

        return { results };
    } catch (error) {
        console.error('Search failed:', error);
        return {
            results: [],
            error: error instanceof Error ? error.message : 'Unknown search error'
        };
    }
}
