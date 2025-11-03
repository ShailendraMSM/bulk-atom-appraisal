const CSV = {
    escape(str) {
        if (str === null || str === undefined) return '';
        str = String(str);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    },

    generate(results) {
        const headers = [
            'Domain', 
            'Appraisal Value', 
            'Domain Score', 
            'Positive Signals', 
            'Negative Signals', 
            'TLD Taken Count', 
            'TM Conflicts', 
            'Date Registered',
            'User Level',
            'Status'
        ];
        
        let csvContent = headers.join(',') + '\n';
        
        results.forEach(result => {
            const row = [
                this.escape(result.domain),
                result.appraisal,
                result.score,
                this.escape(result.positive_signals),
                this.escape(result.negative_signals),
                result.tld_taken,
                result.tm_conflicts,
                this.escape(result.date_registered),
                this.escape(result.user_level),
                this.escape(result.status)
            ];
            csvContent += row.join(',') + '\n';
        });

        return csvContent;
    },

    download(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};
