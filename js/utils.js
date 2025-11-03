const Utils = {
    showMessage(text, type) {
        DOM.validationResults.innerHTML = `<div class="message ${type}">${text}</div>`;
        DOM.validationResults.classList.remove('hidden');
    },

    cleanDomain(domain) {
        domain = domain.toLowerCase().trim();
        domain = domain.replace(/^https?:\/\//, '');
        domain = domain.replace(/^www\./, '');
        domain = domain.split('/')[0];
        domain = domain.split('?')[0];
        domain = domain.split('#')[0];
        return domain;
    },

    isValidDomain(domain) {
        if (!domain || !domain.includes('.')) return false;
        return CONFIG.allowedTLDs.some(tld => domain.endsWith(tld));
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    formatCurrency(value) {
        return '$' + Number(value).toLocaleString();
    }
};
