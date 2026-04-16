import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Settings, 
  CheckCircle, 
  RefreshCcw, 
  Download, 
  Eye, 
  EyeOff,
  Building2,
  Printer
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import logoImg from './assets/logo.jpg';

// Import Form Components
import ProjectOrderForm from './components/ProjectOrderForm';
import ImplementationForm from './components/ImplementationForm';
import DeliveryAcceptanceForm from './components/DeliveryAcceptanceForm';
import ChangeOrderForm from './components/ChangeOrderForm';

function App() {
  const [activeTab, setActiveTab] = useState('order');
  const [isPreview, setIsPreview] = useState(false);
  const formRef = useRef();

  const tabs = [
    { id: 'order', label: 'Client Order', icon: <FileText size={18} /> },
    { id: 'implementation', label: 'Implementation', icon: <Settings size={18} /> },
    { id: 'delivery', label: 'Delivery Acceptance', icon: <CheckCircle size={18} /> },
    { id: 'change', label: 'Change Request', icon: <RefreshCcw size={18} /> },
  ];

  const handleDownloadPDF = () => {
    const element = formRef.current;
    
    // Switch to preview mode temporarily for better PDF look
    const wasPreview = isPreview;
    setIsPreview(true);
    
    // Use a timeout to ensure state update (isPreview) is rendered before capturing
    setTimeout(() => {
      
      // FOOLPROOF HTML2CANVAS WORKAROUND
      // html2canvas struggles to consistently render <input> colors, placeholders, and CSS variables.
      // We physically swap inputs with <div>s and force all colors inline to pure black.
      
      const textElements = element.querySelectorAll('*');
      const originalStyles = new Map();

      // Force pure black on all elements and borders inline
      textElements.forEach(el => {
        if (!el.style || !el.style.setProperty) return;
        
        const className = typeof el.className === 'string' ? el.className : '';
        
        // Let the form badge keep its white text
        if (className.includes('form-badge')) return;
        
       originalStyles.set(el, {
  color: el.style.color,
  webkitTextFillColor: el.style.webkitTextFillColor,
  opacity: el.style.opacity,
  borderLeftColor: el.style.borderLeftColor
});

if (el.tagName === 'LABEL') {
  el.style.setProperty('color', '#0f4d3f', 'important');
  el.style.setProperty('-webkit-text-fill-color', '#0f4d3f', 'important');
} else {
  el.style.setProperty('color', '#000000', 'important');
  el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
}
el.style.setProperty('opacity', '1', 'important');
if (el.tagName === 'H3' || className.includes('section-title')) {
  el.style.setProperty('border-left-color', '#000000', 'important');
}
      });

      // Swap inputs to divs for flawless text rendering
      const inputs = Array.from(element.querySelectorAll('input:not([type="checkbox"]), textarea, select'));
      const replacements = [];
      
      inputs.forEach(input => {
        const parent = input.parentNode;
        const div = document.createElement('div');
        
        // Copy computed styles so it looks structurally identical
        const computed = window.getComputedStyle(input);
        div.style.padding = computed.padding;
        div.style.margin = computed.margin;
        div.style.fontSize = computed.fontSize;
        div.style.fontFamily = computed.fontFamily;
        div.style.lineHeight = computed.lineHeight;
        div.style.minHeight = computed.height;
        
        // Apply pure black text overrides
       div.style.color = '#000000ff';
div.style.webkitTextFillColor = '#000000';
div.style.opacity = '1';
div.style.fontWeight = '700';
div.style.fontFamily = computed.fontFamily;
div.style.fontSize = computed.fontSize;
div.style.letterSpacing = computed.letterSpacing;
div.style.textTransform = computed.textTransform;
div.style.border = 'none';
div.style.background = 'transparent';
div.style.whiteSpace = 'pre-wrap';
div.style.wordBreak = 'break-word';
        div.className = input.className;
        
        // Extract value or placeholder
        const valueToPrint = input.value || input.placeholder || '';
        div.innerText = valueToPrint;
        
        parent.replaceChild(div, input);
        replacements.push({ parent, div, input });
      });

      const opt = {
        margin: [10, 10],
        filename: `JOD_TECH_Form_${activeTab.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        // REVERT ALL MODIFICATIONS
        replacements.forEach(r => {
          r.parent.replaceChild(r.input, r.div);
        });
        
        textElements.forEach(el => {
          const old = originalStyles.get(el);
          if (old) {
            el.style.color = old.color;
el.style.webkitTextFillColor = old.webkitTextFillColor;
el.style.opacity = old.opacity;
el.style.borderLeftColor = old.borderLeftColor;
          }
        });
        
        setIsPreview(wasPreview);
      });
    }, 200);
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'order': return <ProjectOrderForm />;
      case 'implementation': return <ImplementationForm />;
      case 'delivery': return <DeliveryAcceptanceForm />;
      case 'change': return <ChangeOrderForm />;
      default: return <ProjectOrderForm />;
    }
  };

  return (
    <div className={`app-wrapper ${isPreview ? 'preview-active' : ''}`}>
      {/* Header Actions */}
      <header className="no-print main-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-logo">
              <Building2 size={24} />
            </div>
            <div>
              <h1>JOD TECH Forms</h1>
              <p>Professional IT Project Documentation</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              className={`btn ${isPreview ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setIsPreview(!isPreview)}
              title={isPreview ? 'Switch to Edit Mode' : 'Switch to Preview Mode'}
            >
              {isPreview ? <EyeOff size={18} /> : <Eye size={18} />}
              <span>{isPreview ? 'Edit Mode' : 'Live Preview'}</span>
            </button>
            <button 
              className="btn btn-primary download-btn"
              onClick={handleDownloadPDF}
            >
              <Download size={18} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                // Optionally keep scroll position or scroll to top of form
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && <div className="tab-indicator" />}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Form Content */}
      <main className="form-card-container">
        <div className={`paper-form ${isPreview ? 'is-preview' : ''}`} ref={formRef}>
          {/* Paper Header (Visible in PDF/Preview) */}
          <div className="paper-header">
            <div className="company-logo-section">
              <img src={logoImg} alt="JOD TECH Logo" className="header-logo-img" />
              <div className="company-info">
                <div className="corp-logo">JOD TECH</div>
                <div className="corp-tagline">IT SOLUTION</div>
                <div className="corp-meta">
                  No 10, Chitharanjan Street, Chinna Chokkikulam, Madurai - 625002<br/>
                  jodtech11@gmail.com | 96298 72195 - 78679 08377
                </div>
              </div>
            </div>
            <div className="form-type-meta">
              <div className="form-badge">
                {tabs.find(t => t.id === activeTab)?.label.toUpperCase()}
              </div>
              <div className="gst-number">GST: 33FAVPR3433JIZ5</div>
              <div className="doc-meta-field">
                <span className="doc-meta-label">DOC #</span>
                <input 
                  type="text" 
                  defaultValue={`${activeTab.slice(0, 3).toUpperCase()}-${new Date().getFullYear()}-0416`} 
                  className="meta-input"
                />
              </div>
              <div className="doc-meta-field">
                <span className="doc-meta-label">DATE:</span>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]} 
                  className="meta-input meta-date"
                />
              </div>
            </div>
          </div>

          <div className="form-body">
            {renderActiveForm()}
            
            {/* Common Signature Section */}
            <div className="signature-section">
              <h3 className="section-title"><Printer size={20} /> FINAL APPROVAL & SIGNATURES</h3>
              <div className="signature-grid">
                <div className="sig-box">
                  <div className="sig-line" />
                  <div className="sig-label">Client Authorized Signature</div>
                  <div className="sig-meta">Name & Designation: ____________________</div>
                  <div className="sig-meta">Date: ____________________</div>
                </div>
                <div className="sig-box">
                  <div className="sig-line" />
                  <div className="sig-label">Company Representative Signature</div>
                  <div className="sig-meta">Name: ____________________</div>
                  <div className="sig-meta">Date: ____________________</div>
                </div>
              </div>
            </div>

            {/* Paper Footer */}
            <div className="paper-footer">
              <div className="confidential-stamp">CONFIDENTIAL DOCUMENT</div>
              <div className="footer-links">This document is a formal agreement between JOD TECH and the Client.</div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="no-print fab-container">
        <button className="fab" onClick={handleDownloadPDF}>
          <Download size={24} />
        </button>
      </div>

      <footer className="no-print site-footer">
        <p>&copy; {new Date().getFullYear()} JOD TECH. Empowering Digital Transformation.</p>
      </footer>
    </div>
  );
}

export default App;
