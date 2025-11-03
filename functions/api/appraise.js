export async function onRequestGet(context) {
    const { searchParams } = new URL(context.request.url);
    
    const apiToken = searchParams.get('api_token');
    const userId = searchParams.get('user_id');
    const domainName = searchParams.get('domain_name');

    if (!apiToken || !userId || !domainName) {
        return new Response(JSON.stringify({ error: 'Missing parameters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
    }

    const atomUrl = `https://www.atom.com/api/marketplace/domain-appraisal?api_token=${apiToken}&user_id=${userId}&domain_name=${domainName}`;

    try {
        // Use cf object to configure Cloudflare-specific options
        const response = await fetch(atomUrl, {
            cf: {
                // Bypass Cloudflare's cache
                cacheTtl: 0,
                cacheEverything: false,
                // Mimic browser behavior
                scrapeShield: false,
                apps: false,
                minify: {
                    javascript: false,
                    css: false,
                    html: false
                }
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0'
            }
        });

        const text = await response.text();
        
        console.log('Response Status:', response.status);
        console.log('Response Preview:', text.substring(0, 200));

        // Check for Cloudflare challenge
        if (text.includes('Attention Required') || text.includes('cloudflare')) {
            return new Response(JSON.stringify({
                error: 'Still getting Cloudflare challenge',
                hint: 'Cloudflare Workers IP is being blocked by Atom.com',
                suggestion: 'Consider using Chrome Extension instead'
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        // Parse and return JSON
        const data = JSON.parse(text);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
