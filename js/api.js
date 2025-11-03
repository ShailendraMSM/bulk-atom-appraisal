const API = {
    results: [],

    async fetchDomainAppraisal(domain, apiKey, userId) {
        const url = `${CONFIG.apiBaseUrl}?api_token=${encodeURIComponent(apiKey)}&user_id=${encodeURIComponent(userId)}&domain_name=${encodeURIComponent(domain)}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            
            // Log the full response for debugging
            console.log(`Response for ${domain}:`, data);

            // Check if there's an error in the response
            if (data.error) {
                throw new Error(data.error + (data.details ? ': ' + data.details : ''));
            }

            // Check if we have valid appraisal data
            if (data && (typeof data.atom_appraisal !== 'undefined' || typeof data.domain_name !== 'undefined')) {
                return { success: true, data };
            } else {
                console.error('Unexpected response structure:', data);
                throw new Error('Invalid API response structure');
            }
        } catch (error) {
            console.error(`Error fetching ${domain}:`, error);
            return { 
                success: false, 
                error: error.message,
                domain: domain 
            };
        }
    },

    async appraiseAll(domains, apiKey, userId) {
        this.results = [];
        let successCount = 0;
        let errorCount = 0;
        let totalValue = 0;

        DOM.appraisalSection.classList.add('hidden');
        DOM.progressSection.classList.remove('hidden');
        DOM.resultsSection.classList.add('hidden');
        DOM.totalDomains.textContent = domains.length;

        for (let i = 0; i < domains.length; i++) {
            const domain = domains[i];
            DOM.currentDomain.textContent = i + 1;
            
            const progress = Math.round(((i + 1) / domains.length) * 100);
            DOM.progressBar.style.width = progress + '%';
            DOM.progressBar.textContent = progress + '%';

            const result = await this.fetchDomainAppraisal(domain, apiKey, userId);

            if (result.success) {
                successCount++;
                const appraisalValue = result.data.atom_appraisal || 0;
                totalValue += appraisalValue;
                
                // Handle arrays safely
                const positiveSignals = Array.isArray(result.data.positive_signals) 
                    ? result.data.positive_signals.join('; ') 
                    : (result.data.positive_signals || '');
                
                const negativeSignals = Array.isArray(result.data.negative_signals) 
                    ? result.data.negative_signals.join('; ') 
                    : (result.data.negative_signals || '');
                
                this.results.push({
                    domain: result.data.domain_name || domain,
                    appraisal: appraisalValue,
                    score: result.data.domain_score || 0,
                    positive_signals: positiveSignals,
                    negative_signals: negativeSignals,
                    tld_taken: result.data.tld_taken_count || 0,
                    tm_conflicts: result.data.tm_conflicts || 0,
                    date_registered: result.data.date_registered || '',
                    user_level: result.data.user_level || '',
                    status: 'Success'
                });
            } else {
                errorCount++;
                this.results.push({
                    domain: domain,
                    appraisal: 0,
                    score: 0,
                    positive_signals: '',
                    negative_signals: '',
                    tld_taken: 0,
                    tm_conflicts: 0,
                    date_registered: '',
                    user_level: '',
                    status: `Error: ${result.error}`
                });
            }

            if (i < domains.length - 1) {
                await Utils.sleep(CONFIG.delayBetweenRequests);
            }
        }

        DOM.progressSection.classList.add('hidden');
        DOM.resultsSection.classList.remove('hidden');
        DOM.successCount.textContent = successCount;
        DOM.errorCount.textContent = errorCount;
        DOM.totalValue.textContent = Utils.formatCurrency(totalValue);

        return {
            successCount,
            errorCount,
            totalValue,
            results: this.results
        };
    }
};
