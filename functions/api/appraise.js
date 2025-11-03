export async function onRequestGet(context) {
    const { searchParams } = new URL(context.request.url);
    
    const apiToken = searchParams.get('api_token');
    const userId = searchParams.get('user_id');
    const domainName = searchParams.get('domain_name');

    // Validate required parameters
    if (!apiToken || !userId || !domainName) {
        return new Response(JSON.stringify({
            error: 'Missing required parameters: api_token, user_id, or domain_name'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    // Build Atom.com API URL
    const atomUrl = `https://www.atom.com/api/marketplace/domain-appraisal?api_token=${encodeURIComponent(apiToken)}&user_id=${encodeURIComponent(userId)}&domain_name=${encodeURIComponent(domainName)}`;

    try {
        // Fetch from Atom.com API
        const response = await fetch(atomUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Atom-Valuation-Tool/1.0'
            }
        });

        if (!response.ok) {
            throw new Error(`Atom API responded with status ${response.status}`);
        }

        const data = await response.json();

        // Return successful response with CORS headers
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Proxy Error:', error.message);
        
        // Return error response
        return new Response(JSON.stringify({
            error: error.message,
            domain: domainName
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

// Handle CORS preflight requests
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
