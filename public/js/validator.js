const Validator = {
    validatedDomains: [],

    validate() {
        const domainList = DOM.domainList.value;
        const apiKey = DOM.apiKey.value.trim();
        const userId = DOM.userId.value.trim();

        if (!apiKey || !userId) {
            Utils.showMessage('⚠️ Please enter both API Key and User ID', 'error');
            return false;
        }

        const lines = domainList.split('\n')
            .map(line => line.trim())
            .filter(line => line);
        
        if (lines.length === 0) {
            Utils.showMessage('⚠️ Please enter at least one domain', 'error');
            return false;
        }

        this.validatedDomains = [];
        const errors = [];

        lines.forEach((line, index) => {
            const cleanedDomain = Utils.cleanDomain(line);
            
            if (Utils.isValidDomain(cleanedDomain)) {
                if (!this.validatedDomains.includes(cleanedDomain)) {
                    this.validatedDomains.push(cleanedDomain);
                }
            } else {
                errors.push(`Line ${index + 1}: "${line}" - Invalid domain or TLD not allowed`);
            }
        });

        let message = '';
        if (this.validatedDomains.length > 0) {
            message += `<div class="message success">✅ ${this.validatedDomains.length} valid domain(s) found and ready for appraisal</div>`;
            DOM.domainCount.textContent = this.validatedDomains.length;
            DOM.appraisalSection.classList.remove('hidden');
        }
        
        if (errors.length > 0) {
            const errorList = errors.slice(0, 5).join('<br>');
            const moreErrors = errors.length > 5 ? `<br>...and ${errors.length - 5} more` : '';
            message += `<div class="message warning">⚠️ ${errors.length} invalid domain(s) skipped:<br>${errorList}${moreErrors}</div>`;
        }

        if (this.validatedDomains.length === 0) {
            message = '<div class="message error">❌ No valid domains found. Please check your input.</div>';
        }

        DOM.validationResults.innerHTML = message;
        DOM.validationResults.classList.remove('hidden');

        return this.validatedDomains.length > 0;
    }
};
