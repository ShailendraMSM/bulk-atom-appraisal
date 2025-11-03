export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { api_token, user_id, domain_name } = req.query;

    if (!api_token || !user_id || !domain_name) {
        return res.status(400).json({
            error: 'Missing required parameters: api_token, user_id, or domain_name'
        });
    }

    const atomUrl = `https://www.atom.com/api/marketplace/domain-appraisal?api_token=${encodeURIComponent(api_token)}&user_id=${encodeURIComponent(user_id)}&domain_name=${encodeURIComponent(domain_name)}`;

    try {
        const response = await fetch(atomUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site'
            }
        });

        const text = await response.text();

        // Log for debugging
        console.log('Domain:', domain_name);
        console.log('Status:', response.status);
        console.log('Response preview:', text.substring(0, 200));

        // Check for Cloudflare challenge
        if (text.includes('Attention Required') || text.includes('<!DOCTYPE html>')) {
            console.error('Cloudflare challenge detected');
            return res.status(403).json({
                error: 'Cloudflare protection detected',
                domain: domain_name,
                hint: 'The API endpoint is protected by Cloudflare'
            });
        }

        // Try to parse JSON
        let data;
        try {
            data = JSON.parse(text);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return res.status(500).json({
                error: 'Invalid JSON response from API',
                raw: text.substring(0, 500)
            });
        }

        // Return successful response
        return res.status(200).json(data);

    } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({
            error: error.message,
            domain: domain_name
        });
    }
}
