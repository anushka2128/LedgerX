# LedgerX — India's Smartest CA Platform

LedgerX is a premium, AI-powered marketplace connecting clients with Chartered Accountants (CAs) in India. It features automated tax filing assistance, real-time messaging, document analysis via OCR and Claude AI, and a smart matching system.

## 🚀 Features

- **AI TaxBot**: Real-time tax assistance powered by Claude 3.5 Sonnet.
- **Smart Marketplace**: Find and book verified CAs based on "AI Smart Score" (experience, ratings, and fees).
- **Document Intelligence**: Upload financial documents for automatic OCR extraction and AI-driven analysis/risk assessment.
- **Unified Dashboards**: Separate, data-rich portals for both Clients and CAs.
- **Real-time Communication**: Integrated chat system with instant notifications.
- **Secure Storage**: Firebase-backed secure document management.

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+).
- **Backend**: Firebase (Authentication, Firestore, Storage).
- **AI/ML**: 
  - Anthropic Claude 3.5 Sonnet (via Cloud Functions proxy).
  - OCR.space (Document text extraction).
- **Cloud Functions**: Node.js 18 environment for secure API handling.

## 📦 Setup & Deployment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sahillll31/LedgerX.git
   cd LedgerX
   ```

2. **Install Cloud Functions dependencies**:
   ```bash
   cd functions
   npm install
   ```

3. **Configure Firebase**:
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login: `firebase login`
   - Set active project: `firebase use ledgerx-47da3`

4. **Add Secrets**:
   Set your Anthropic API key for the Claude proxy:
   ```bash
   firebase functions:secrets:set CLAUDE_API_KEY
   ```

5. **Deploy**:
   ```bash
   firebase deploy
   ```

## 📜 License

Created by Sahil for the LedgerX platform.
