import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/i18n'; // Initialize i18n
import { runResponsiveAudit } from '@/utils/browserTestRunner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.DEV) {
  (window as any).runResponsiveAudit = runResponsiveAudit;
}

console.log('🚀 Application loaded.');
