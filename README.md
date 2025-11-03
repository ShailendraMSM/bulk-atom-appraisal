# Atom Bulk Valuation Tool

A beautiful, secure web application for bulk domain appraisal using the Atom.com API.

🌐 **Live Demo:** [https://bulk-atom-appraisal.vercel.app](https://bulk-atom-appraisal.vercel.app)

---

## 🚀 Features

- ✅ **Bulk Domain Validation** - Process multiple domains at once
- ✅ **Smart Domain Cleaning** - Automatically removes protocols, www, and trailing slashes
- ✅ **TLD Support** - Supports .com, .net, .org, .co, .ai, .io, .xyz, .co.uk, .app, .in
- ✅ **Real-time Progress** - Visual progress bar and domain counter
- ✅ **Comprehensive CSV Export** - Download detailed appraisal reports
- ✅ **Beautiful Responsive UI** - Works perfectly on desktop and mobile
- ✅ **Privacy-Focused** - No credential storage or caching
- ✅ **Error Handling** - Clear error messages and validation feedback
- ✅ **Serverless Architecture** - Fast and scalable on Vercel

---

## 🔒 Privacy & Security

**Your data is safe:**
- ✅ **No credential storage** - API keys are never cached or logged
- ✅ **Client-side processing** - All domain validation happens in your browser
- ✅ **Serverless proxy only** - Our backend only forwards requests to Atom.com
- ✅ **Open source** - Full transparency - review all code on GitHub
- ✅ **No tracking** - We don't use analytics or tracking scripts
- ✅ **HTTPS only** - All communication is encrypted

---

## 📋 How to Use

### **Step 1: Get Your Credentials**

You need two pieces of information from Atom.com:

1. **API Token:**  
   Get it here: [https://www.atom.com/dashboard/seller/api-access](https://www.atom.com/dashboard/seller/api-access)

2. **User ID:**  
   Get it here: [https://www.atom.com/dashboard/account/details](https://www.atom.com/dashboard/account/details)

### **Step 2: Prepare Your Domain List**

Create a list of domains (one per line):


example.com
mydomain.net
coolsite.io



The tool will automatically:
- Remove `http://` and `https://`
- Remove `www.`
- Remove trailing slashes and paths
- Convert to lowercase
- Validate TLD support

### **Step 3: Run Appraisal**

1. Visit [https://bulk-atom-appraisal.vercel.app](https://bulk-atom-appraisal.vercel.app)
2. Enter your API credentials
3. Paste your domain list
4. Click "Validate Domains"
5. Review validated domains
6. Click "Appraise All Domains"
7. Wait for processing (progress bar shows status)
8. Download CSV report

---

## 📊 CSV Export Format

The exported CSV includes:

| Column | Description |
|--------|-------------|
| Domain | Domain name |
| Appraisal Value | Estimated value in USD |
| Domain Score | Score out of 10 |
| Positive Signals | Factors increasing value |
| Negative Signals | Factors decreasing value |
| TLD Taken Count | Number of TLD variations registered |
| TM Conflicts | Trademark conflicts count |
| Date Registered | Original registration date |
| User Level | Your Atom.com user level |
| Status | Success or error message |

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend:** Vercel Serverless Functions (Node.js)
- **Hosting:** Vercel (with global CDN)
- **API:** Atom.com Domain Appraisal API


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Atom.com** for providing the domain appraisal API
- **Vercel** for excellent serverless hosting platform
- **DomainX Community** for inspiration and support
- **Contributors** who help improve this tool

---

## 📧 Support

- **Issues:** [GitHub Issues](https://github.com/ShailendraMSM/bulk-atom-appraisal/issues)
- **Discussions:** [GitHub Discussions](https://github.com/ShailendraMSM/bulk-atom-appraisal/discussions)

---

## 🔗 Links

- **Live App:** [https://bulk-atom-appraisal.vercel.app](https://bulk-atom-appraisal.vercel.app)
- **GitHub:** [https://github.com/ShailendraMSM/bulk-atom-appraisal](https://github.com/ShailendraMSM/bulk-atom-appraisal)
- **Atom.com API:** [https://www.atom.com/dashboard/seller/api-access](https://www.atom.com/dashboard/seller/api-access)

---

## 📸 Screenshots

### Main Interface
Beautiful gradient design with intuitive input fields for API credentials and domain list.

### Progress Tracking
Real-time progress bar showing which domain is currently being processed.

### CSV Export
Comprehensive report with all appraisal data including positive/negative signals, TM conflicts, and more.

---

## 🎯 Supported TLDs

- .com
- .net
- .org
- .co
- .ai
- .io
- .xyz
- .co.uk
- .app
- .in

*Need support for additional TLDs? Open an issue or submit a PR!*
