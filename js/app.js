const App = {
    init() {
        DOM.validateBtn.addEventListener('click', () => this.handleValidate());
        DOM.appraiseBtn.addEventListener('click', () => this.handleAppraise());
        DOM.downloadBtn.addEventListener('click', () => this.handleDownload());
        DOM.resetBtn.addEventListener('click', () => this.handleReset());

        console.log('✅ Atom Valuation Tool initialized');
    },

    handleValidate() {
        Validator.validate();
    },

    async handleAppraise() {
        const apiKey = DOM.apiKey.value.trim();
        const userId = DOM.userId.value.trim();

        if (!apiKey || !userId) {
            Utils.showMessage('⚠️ Please enter both API Key and User ID', 'error');
            return;
        }

        if (Validator.validatedDomains.length === 0) {
            Utils.showMessage('⚠️ Please validate domains first', 'error');
            return;
        }

        await API.appraiseAll(Validator.validatedDomains, apiKey, userId);
    },

    handleDownload() {
        if (API.results.length === 0) {
            alert('No results to download');
            return;
        }

        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `atom_appraisals_${timestamp}.csv`;
        const csvContent = CSV.generate(API.results);
        
        CSV.download(csvContent, filename);
    },

    handleReset() {
        Validator.validatedDomains = [];
        API.results = [];
        
        DOM.domainList.value = '';
        DOM.validationResults.classList.add('hidden');
        DOM.appraisalSection.classList.add('hidden');
        DOM.progressSection.classList.add('hidden');
        DOM.resultsSection.classList.add('hidden');
        
        DOM.progressBar.style.width = '0%';
        DOM.progressBar.textContent = '0%';
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
