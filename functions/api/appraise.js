export async function onRequestGet(context) {
    const { searchParams } = new URL(context.request.url);
    
    const apiToken = searchParams.get('api_token');
    const userId = searchParams.get('user_id');
    const domainName = searchParams.get('domain_name');

    if (!apiToken || !userId || !domainName) {
        return new Response(JSON.stringify({
            error: 'Missing required parameters'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    const atomUrl = `https://www.atom.com/api/marketplace/domain-appraisal?api_token=${encodeURIComponent(apiToken)}&user_id=${encodeURIComponent(userId)}&domain_name=${encodeURIComponent(domainName)}`;

    try {
        const response = await fetch(atomUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.atom.com/',
                'Origin': 'https://www.atom.com',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin'
            }
        });

        const responseText = await response.text();
        
        console.log('Status:', response.status);
        console.log('Response:', responseText.substring(0, 500));

        if (!response.ok) {
            return new Response(JSON.stringify({
                error: `Atom API error: ${response.status}`,
                details: responseText.substring(0, 500)
            }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        const data = JSON.parse(responseText);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        
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
