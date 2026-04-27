import { useState } from "react";
import logo from "./assets/jod.jpeg";


/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: #0a0f1e;
  color: #e2e8f0;
  min-height: 100vh;
}

/* SCROLLBAR */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0a0f1e; }
::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 99px; }

/* TOPBAR */
.topbar {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,15,30,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(56,139,253,0.18);
  padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 64px; gap: 16px; flex-wrap: wrap;
}
.topbar-brand { display: flex; align-items: center; gap: 12px; }
.topbar-logo {
  width: 44px; height: 44px;
  background: white;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.topbar-logo img {
  width: 100%; height: 100%; object-fit: contain;
}
.topbar-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; color: #e2e8f0; }
.topbar-sub { font-size: 11px; color: #64748b; margin-top: 1px; }
.btn-dl {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #0a0f1e; border: none; border-radius: 10px;
  padding: 9px 18px; font-weight: 700; font-size: 13px;
  cursor: pointer; display: flex; align-items: center; gap: 7px;
  white-space: nowrap; transition: all 0.2s;
  box-shadow: 0 0 20px rgba(245,158,11,0.3);
}
.btn-dl:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(245,158,11,0.5); }

/* FORM TABS */
.form-tabs {
  display: flex; padding: 16px 24px 0;
  gap: 6px; overflow-x: auto;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: #0d1526;
}
.form-tab {
  padding: 10px 18px; border-radius: 10px 10px 0 0;
  font-size: 12px; font-weight: 600; cursor: pointer;
  white-space: nowrap; transition: all 0.2s;
  color: #64748b; border: 1px solid transparent;
  border-bottom: none; letter-spacing: 0.3px;
}
.form-tab.active {
  color: #42a5f5;
  background: #0a0f1e;
  border-color: rgba(56,139,253,0.25);
  border-bottom: 1px solid #0a0f1e;
  margin-bottom: -1px;
}
.form-tab:hover:not(.active) { color: #94a3b8; background: rgba(255,255,255,0.04); }

/* SPLIT LAYOUT */
.split { display: flex; height: calc(100vh - 128px); }
.pane-form {
  width: 380px; min-width: 300px;
  background: #0d1526;
  border-right: 1px solid rgba(255,255,255,0.06);
  overflow-y: auto; padding: 24px 20px;
}
.pane-preview {
  flex: 1; overflow-y: auto;
  background: #080d1a;
  padding: 24px;
}
.pane-preview.hide-mobile { display: none; }
@media (min-width: 769px) {
  .pane-preview.hide-mobile { display: block !important; }
}

/* SECTION HEADING */
.sec-head {
  font-size: 10px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 1.2px; color: #42a5f5;
  margin: 20px 0 10px; padding-bottom: 6px;
  border-bottom: 1px solid rgba(66,165,245,0.2);
}
.sec-head:first-child { margin-top: 0; }

/* FORM CONTROLS */
.frow { margin-bottom: 13px; }
.flabel { font-size: 11px; font-weight: 500; color: #64748b; margin-bottom: 5px; display: block; text-transform: uppercase; letter-spacing: 0.5px; }
.finput {
  width: 100%; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  padding: 9px 12px; font-size: 13px; color: #e2e8f0;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  outline: none;
}
.finput:focus { border-color: #42a5f5; background: rgba(66,165,245,0.05); box-shadow: 0 0 0 3px rgba(66,165,245,0.1); }
.finput::placeholder { color: #475569; }
select.finput { cursor: pointer; }
textarea.finput { resize: vertical; min-height: 72px; line-height: 1.5; }
.fgrid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

/* CHECKBOXES */
.check-group { display: flex; flex-direction: column; gap: 7px; }
.check-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.check-item input { accent-color: #42a5f5; width: 14px; height: 14px; cursor: pointer; }
.check-item span { font-size: 12px; color: #94a3b8; }

/* PREVIEW WRAPPER */
.preview-wrap { max-width: 794px; margin: 0 auto; }

/* DOCUMENT */
.doc {
  background: #fff; color: #0f172a;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px; line-height: 1.65;
  padding: 48px 52px;
  box-shadow: 0 0 60px rgba(0,0,0,0.5);
  min-height: 1050px; position: relative;
}

/* DOC HEADER */
.doc-header {
  display: flex; align-items: center; gap: 18px;
  padding-bottom: 18px;
  border-bottom: 2.5px solid #0f2a54;
  margin-bottom: 0;
  flex-wrap: wrap;
}
.doc-logo {
  width: 65px; height: 65px;
  background: white;
  border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.doc-logo img {
  width: 100%; height: 100%; object-fit: contain;
}
.doc-co-name {
  font-family: 'Playfair Display', serif;
  font-size: 22px; font-weight: 700; color: #0f2a54;
  letter-spacing: -0.5px;
}
.doc-co-sub { font-size: 11px; color: #475569; margin-top: 2px; }
.doc-title-bar {
  display: flex; justify-content: space-between; align-items: flex-start;
  background: #0f2a54; color: white;
  padding: 12px 20px; margin: 0 -52px;
}
.doc-form-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px; font-weight: 700; letter-spacing: 0.5px;
}
.doc-meta { font-size: 10.5px; opacity: 0.75; margin-top: 4px; }
.doc-ids { text-align: right; font-size: 11px; color: #475569; }
.doc-ids strong { display: block; font-size: 13px; color: #0f2a54; margin-bottom: 2px; }
.accent-line {
  height: 3px;
  background: linear-gradient(90deg, #1565c0, #42a5f5, #90caf9);
  margin: 0 -52px 22px;
}

/* DOC SECTIONS */
.doc-section { margin-bottom: 24px; break-inside: avoid; page-break-inside: avoid; }
.doc-sec-title {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1.2px; color: #0f2a54;
  margin-bottom: 12px; padding: 8px 0;
  border-bottom: 1.5px solid #0f2a54;
  page-break-after: avoid;
}
.doc-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 0 40px; 
}
.doc-field { 
  padding: 10px 0; 
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  break-inside: avoid;
}
.doc-field-label { 
  font-size: 8.5px; 
  text-transform: uppercase; 
  letter-spacing: 1px; 
  color: #64748b; 
  margin-bottom: 4px; 
  font-weight: 700; 
}
.doc-field-val { 
  font-size: 11.5px; 
  color: #1e293b; 
  font-weight: 500; 
  min-height: 18px; 
  line-height: 1.5; 
}
.doc-field-val.empty { color: #cbd5e1; font-style: italic; font-weight: 400; }
.full-width { grid-column: 1 / -1; }

/* CHECKLIST GRID */
.checklist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.checklist-item {
  display: flex; align-items: center; gap: 7px;
  padding: 5px 8px; border-radius: 5px;
  font-size: 11.5px; color: #334155;
}
.checklist-item.checked { background: #f0fdf4; }
.checklist-item.unchecked { background: #fafafa; opacity: 0.5; }
.check-icon { width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; }
.check-icon.on { background: #22c55e; color: white; }
.check-icon.off { background: #e2e8f0; color: #94a3b8; }

/* SIGNATURE BLOCK */
.sig-row {
  display: flex; gap: 40px; margin-top: 32px;
  padding-top: 20px; border-top: 1.5px solid #e2e8f0;
}
.sig-box { flex: 1; }
.sig-hint { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 28px; }
.sig-line { border-top: 1px solid #94a3b8; padding-top: 6px; }
.sig-name { font-weight: 600; color: #0f2a54; font-size: 12.5px; }
.sig-role { font-size: 10.5px; color: #64748b; }

/* PRIORITY BADGE */
.priority { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 10.5px; font-weight: 600; }
.p-low { background: #f0fdf4; color: #166534; }
.p-medium { background: #fffbeb; color: #92400e; }
.p-high { background: #fff7ed; color: #c2410c; }
.p-urgent { background: #fef2f2; color: #991b1b; }

/* DOC FOOTER */
.doc-footer {
  margin-top: 28px; padding-top: 12px;
  border-top: 1px solid #e2e8f0;
  text-align: center; font-size: 9.5px; color: #94a3b8;
}

/* MOBILE BOTTOM NAV */
.bottom-nav {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(13, 21, 38, 0.85);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255,255,255,0.08);
  height: 68px;
  padding: 0 16px;
  z-index: 1000;
  justify-content: space-around;
  align-items: center;
}
.nav-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 5px; color: #64748b; cursor: pointer; transition: all 0.2s;
  padding: 8px; border-radius: 12px; min-width: 60px;
}
.nav-item svg { width: 22px; height: 22px; stroke-width: 2; transition: transform 0.2s; }
.nav-item span { font-size: 10px; font-weight: 600; letter-spacing: 0.2px; }
.nav-item.active { color: #42a5f5; background: rgba(66,165,245,0.08); }
.nav-item.active svg { transform: translateY(-2px); }
.nav-preview-btn {
  background: #42a5f5; color: white;
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(66,165,245,0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.nav-preview-btn.active { background: #f59e0b; box-shadow: 0 4px 15px rgba(245,158,11,0.4); transform: scale(1.1); }
.nav-preview-btn svg { width: 24px; height: 24px; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .topbar { height: auto; padding: 12px 16px; flex-wrap: wrap; justify-content: space-between; }
  .topbar-brand { flex: 1; }
  .topbar-title { font-size: 14px; }
  .split { flex-direction: column; height: auto; padding-bottom: 80px; }
  .pane-form { width: 100%; min-width: unset; max-height: none; padding: 16px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .pane-preview { padding: 12px; }
  .doc { padding: 24px 18px; font-size: 11px; min-height: unset; }
  .topbar-logo { width: 36px; height: 36px; }
  .doc-header { gap: 12px; }
  .doc-logo { width: 50px; height: 50px; }
  .doc-co-name { font-size: 18px; }
  .doc-ids { text-align: right; margin-top: 8px; }
  .doc-ids strong { font-size: 11px; }
  .doc-title-bar { margin: 0 -18px; flex-direction: column; gap: 8px; padding: 12px 18px; }
  .accent-line { margin: 0 -18px 16px; }
  .doc-grid { grid-template-columns: 1fr; gap: 0; }
  .doc-field { padding: 8px 0; }
  .full-width { grid-column: 1; }
  .checklist-grid { grid-template-columns: 1fr; }
  .sig-row { flex-direction: column; gap: 20px; }
  .form-tabs { display: none; }
  .mobile-tabs { display: none; }
  .mobile-view-toggle { display: none; }
  .bottom-nav { display: flex; }
  .fgrid2 { grid-template-columns: 1fr; }
}

/* PRINT */
@media print {
  body { background: white !important; }
  .topbar, .form-tabs, .mobile-tabs, .pane-form, .mobile-view-toggle, .bottom-nav { display: none !important; }
  .doc-grid { grid-template-columns: 1fr 1fr !important; gap: 0 40px !important; }
  .full-width { grid-column: 1 / -1 !important; }
  .split { height: auto; display: block !important; }
  .pane-preview { padding: 0; background: white; overflow: visible; display: block !important; }
  .preview-wrap { max-width: 100%; }
  .doc { box-shadow: none; padding: 32px 40px; min-height: unset; }
  .doc-title-bar { margin: 0 -40px; }
  .accent-line { margin: 0 -40px 18px; }
  @page { margin: 1.5cm 0.4cm 0.4cm; size: A4; }
  @page :first { margin-top: 0.4cm; }
}
`;

/* ─────────────────────────────────────────────
   DEFAULT DATA
───────────────────────────────────────────── */
const today = new Date().toISOString().split("T")[0];
const defaultDocs = {
  date: today,
  docNo: "JOD/001/2026",
  gst: "33FAVPR3433JIZ5",
};

const defaultClientOrder = {
  ...defaultDocs,
  clientCompany: "TechVision Pvt Ltd",
  contactPerson: "Ramesh Kumar",
  designation: "CTO",
  phone: "+91 98765 43210",
  email: "ramesh@techvision.in",
  clientGST: "33ABCDE1234F1Z5",
  address: "45, Anna Nagar, Chennai - 600040, Tamil Nadu",
  website: "www.techvision.in",
  projectName: "E-Commerce Platform",
  projectType: "E-commerce Solution",
  projectDesc: "A full-featured B2C e-commerce platform with payment gateway integration, inventory management, and admin dashboard.",
  modules: "Product Catalog, Cart, Checkout, Payment Gateway, Admin Panel, Reports",
  techPref: "React.js, Node.js, PostgreSQL",
  platform: "Web",
  numUsers: "500+",
  startDate: "2026-05-01",
  endDate: "2026-09-30",
  milestones: "Design: May 15 | Dev: July 31 | Testing: Sep 15",
  totalCost: "450000",
  advance: "112500",
  paymentTerms: "25% Advance, 25% on Design Approval, 25% on Beta, 25% on Delivery",
};

const defaultImpl = {
  ...defaultDocs,
  docNo: "JOD/002/2026",
  projectId: "JOD-EC-2026",
  projectManager: "Priya Devi R",
  teamMembers: "Arun Kumar (Frontend), Suresh M (Backend), Kavitha S (QA)",
  approvedScope: "Product listings, user auth, cart, checkout, payment integration, admin panel",
  numScreens: "28",
  userRoles: "Customer, Admin, Super Admin",
  dbReq: "PostgreSQL with Redis caching",
  securityReq: "JWT Auth, SSL/TLS, OWASP compliance, data encryption",
  frontend: "React.js 18, TypeScript, Tailwind CSS",
  backend: "Node.js, Express.js, REST API",
  hosting: "AWS EC2 + S3 + CloudFront CDN",
  apiInteg: "Razorpay, Twilio SMS, Firebase Push Notifications",
  uiDesign: "2026-05-15",
  devStart: "2026-05-20",
  betaTest: "2026-08-30",
  finalDeploy: "2026-09-30",
  clientDeps: "Content delivery, logo assets, product data CSV by May 10",
  techRisks: "Third-party payment API changes; mitigation: abstraction layer",
};

const defaultDelivery = {
  ...defaultDocs,
  docNo: "JOD/003/2026",
  deliveryDate: "2026-09-30",
  versionNo: "v1.0.0",
  deliveryType: "Live Deployment",
  deliveredTo: "Ramesh Kumar (CTO)",
  deliveredItems: ["Source Code Shared", "Database Backup Provided", "Hosting Credentials Shared", "Admin Credentials Shared", "User Manual Provided", "Training Sessions Completed", "Testing/UAT Signed Off"],
  warrantyPeriod: "6 Months",
  supportExpiry: "2027-03-30",
  pendingIssues: "Minor UI polish on mobile product gallery — to be resolved within 5 business days",
  supportTerms: "Email & phone support during business hours. Critical bugs resolved within 24 hours.",
  finalInvoice: "337500",
  pendingBalance: "0",
  paymentMode: "Bank Transfer",
};

const defaultChange = {
  ...defaultDocs,
  docNo: "JOD/004/2026",
  crId: "CR-2026-001",
  requestDate: "2026-08-15",
  requestedBy: "Ramesh Kumar (CTO)",
  priority: "High - Critical",
  changeDesc: "Add multi-currency support (USD, EUR, GBP) with live exchange rates for international customers.",
  featureAffected: "Checkout module, Product pricing, Admin configuration panel",
  reason: "Business expansion to international markets requires multi-currency support for conversion.",
  addCost: "35000",
  addTime: "12",
  revisedDelivery: "2026-10-15",
  techImpact: "Payment gateway reconfiguration, new exchange rate API integration, UI changes across checkout flow",
  areasAffected: "Checkout, Product Pages, Admin Panel, Reporting Module",
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function fmt(d) {
  if (!d) return "—";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function val(v, fallback = "—") {
  return v && v.trim() ? v : fallback;
}
function Field({ label, value, full }) {
  const empty = !value || !value.trim();
  return (
    <div className={`doc-field${full ? " full-width" : ""}`}>
      <div className="doc-field-label">{label}</div>
      <div className={`doc-field-val${empty ? " empty" : ""}`}>{empty ? "Not provided" : value}</div>
    </div>
  );
}
function Section({ title, children }) {
  return (
    <div className="doc-section">
      <div className="doc-sec-title">{title}</div>
      <div className="doc-grid">{children}</div>
    </div>
  );
}
function DocHeader({ title, data }) {
  return (
    <>
      <div className="doc-header">
        <div className="doc-logo">
          <img src={logo} alt="JOD TECH Logo" />
        </div>
        <div style={{ flex: 1 }}>
          <div className="doc-co-name">JOD TECH IT SOLUTION</div>
          <div className="doc-co-sub">No 10, Chitharanjan Street, Chinna Chokkikulam, Madurai - 625002</div>
          <div className="doc-co-sub">jodtech11@gmail.com &nbsp;|&nbsp; 96298 72195 &nbsp;-&nbsp; 78679 08377</div>
        </div>
        <div className="doc-ids">
          <strong>DOC NO: {data.docNo}</strong>
          <span>DATE: {fmt(data.date)}</span>
        </div>
      </div>
      <div className="doc-title-bar">
        <div className="doc-form-title">{title}</div>
        <div className="doc-meta">GST NO: {data.gst}</div>
      </div>
      <div className="accent-line" />
    </>
  );
}
function SigBlock() {
  return (
    <div className="sig-row">
      <div className="sig-box">
        <div className="sig-hint">Client Authorized Signature</div>
        <div className="sig-line">
          <div className="sig-name">Name & Designation</div>
          <div className="sig-role">Date: ____________________</div>
        </div>
      </div>
      <div className="sig-box">
        <div className="sig-hint">Company Representative Signature</div>
        <div className="sig-line">
          <div className="sig-name">Authorized Signatory</div>
          <div className="sig-role">Date: ____________________</div>
        </div>
      </div>
    </div>
  );
}
function DocFooter() {
  return <div className="doc-footer">© 2026 JOD TECH IT SOLUTION. Empowering Digital Transformation. All rights reserved.</div>;
}

/* ─────────────────────────────────────────────
   FORM INPUTS HELPER
───────────────────────────────────────────── */
function F({ label, name, state, set, type = "text", placeholder = "", rows }) {
  return (
    <div className="frow">
      <label className="flabel">{label}</label>
      {rows ? (
        <textarea className="finput" rows={rows} name={name} value={state[name]} onChange={e => set({ ...state, [e.target.name]: e.target.value })} placeholder={placeholder} />
      ) : (
        <input className="finput" type={type} name={name} value={state[name]} onChange={e => set({ ...state, [e.target.name]: e.target.value })} placeholder={placeholder} />
      )}
    </div>
  );
}
function Sel({ label, name, state, set, options }) {
  return (
    <div className="frow">
      <label className="flabel">{label}</label>
      <select className="finput" name={name} value={state[name]} onChange={e => set({ ...state, [e.target.name]: e.target.value })}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORM 1 — CLIENT ORDER
───────────────────────────────────────────── */
function ClientOrderForm({ data, set }) {
  return (
    <>
      <div className="sec-head">Document Info</div>
      <div className="fgrid2">
        <F label="Doc No" name="docNo" state={data} set={set} />
        <F label="Date" name="date" state={data} set={set} type="date" />
      </div>
      <div className="sec-head">Client Information</div>
      <F label="Client Company Name" name="clientCompany" state={data} set={set} />
      <div className="fgrid2">
        <F label="Contact Person" name="contactPerson" state={data} set={set} />
        <F label="Designation" name="designation" state={data} set={set} />
      </div>
      <div className="fgrid2">
        <F label="Phone Number" name="phone" state={data} set={set} />
        <F label="Email Address" name="email" state={data} set={set} type="email" />
      </div>
      <F label="GST Number / Tax ID" name="clientGST" state={data} set={set} />
      <F label="Company Address" name="address" state={data} set={set} rows={2} />
      <F label="Website URL" name="website" state={data} set={set} />
      <div className="sec-head">Project Information</div>
      <F label="Project Name" name="projectName" state={data} set={set} />
      <Sel label="Project Type" name="projectType" state={data} set={set} options={["Web Application","Mobile App (iOS/Android)","Desktop Application","CMS Development","E-commerce Solution","Custom Software"]} />
      <F label="Project Description" name="projectDesc" state={data} set={set} rows={3} />
      <F label="Modules Required" name="modules" state={data} set={set} rows={2} />
      <F label="Technology Preference" name="techPref" state={data} set={set} />
      <Sel label="Platform Type" name="platform" state={data} set={set} options={["Web","Mobile","Desktop","Web + Mobile"]} />
      <F label="Number of Users" name="numUsers" state={data} set={set} />
      <div className="sec-head">Timeline Details</div>
      <div className="fgrid2">
        <F label="Start Date" name="startDate" state={data} set={set} type="date" />
        <F label="Completion Date" name="endDate" state={data} set={set} type="date" />
      </div>
      <F label="Milestone Dates" name="milestones" state={data} set={set} rows={2} />
      <div className="sec-head">Commercial Details</div>
      <div className="fgrid2">
        <F label="Total Project Cost (₹)" name="totalCost" state={data} set={set} type="number" />
        <F label="Advance Amount (₹)" name="advance" state={data} set={set} type="number" />
      </div>
      <F label="Payment Terms" name="paymentTerms" state={data} set={set} rows={2} />
    </>
  );
}

function ClientOrderDoc({ data }) {
  const cost = parseInt(data.totalCost) || 0;
  const adv = parseInt(data.advance) || 0;
  const bal = cost - adv;
  return (
    <div className="doc">
      <DocHeader title="CLIENT ORDER" data={data} />
      <Section title="Client Information">
        <Field label="Client Company Name" value={data.clientCompany} />
        <Field label="Contact Person" value={data.contactPerson} />
        <Field label="Designation" value={data.designation} />
        <Field label="Phone Number" value={data.phone} />
        <Field label="Email Address" value={data.email} />
        <Field label="GST Number / Tax ID" value={data.clientGST} />
        <Field label="Website URL" value={data.website} />
        <Field label="Company Address" value={data.address} full />
      </Section>
      <Section title="Project Information">
        <Field label="Project Name" value={data.projectName} />
        <Field label="Project Type" value={data.projectType} />
        <Field label="Platform" value={data.platform} />
        <Field label="Number of Users" value={data.numUsers} />
        <Field label="Technology Preference" value={data.techPref} />
        <Field label="Project Description" value={data.projectDesc} full />
        <Field label="Modules Required" value={data.modules} full />
      </Section>
      <Section title="Timeline Details">
        <Field label="Project Start Date" value={fmt(data.startDate)} />
        <Field label="Expected Completion" value={fmt(data.endDate)} />
        <Field label="Milestone Dates" value={data.milestones} full />
      </Section>
      <Section title="Commercial Details">
        <Field label="Total Project Cost" value={cost ? `₹ ${cost.toLocaleString("en-IN")}` : ""} />
        <Field label="Advance Amount" value={adv ? `₹ ${adv.toLocaleString("en-IN")}` : ""} />
        <Field label="Balance Amount" value={cost ? `₹ ${bal.toLocaleString("en-IN")}` : ""} />
        <Field label="Payment Terms" value={data.paymentTerms} full />
      </Section>
      <div style={{ marginTop: "8px", padding: "10px 14px", background: "#f8faff", borderRadius: "6px", border: "1px solid #bfdbfe", fontSize: "11px", color: "#1e40af" }}>
        ⚡ This client order is legally binding upon signature by both parties. Changes to scope require a formal Change Request.
      </div>
      <SigBlock />
      <DocFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORM 2 — IMPLEMENTATION
───────────────────────────────────────────── */
function ImplForm({ data, set }) {
  return (
    <>
      <div className="sec-head">Document Info</div>
      <div className="fgrid2">
        <F label="Doc No" name="docNo" state={data} set={set} />
        <F label="Date" name="date" state={data} set={set} type="date" />
      </div>
      <div className="sec-head">Basic Project Details</div>
      <div className="fgrid2">
        <F label="Project ID" name="projectId" state={data} set={set} />
        <F label="Project Manager" name="projectManager" state={data} set={set} />
      </div>
      <F label="Team Members Assigned" name="teamMembers" state={data} set={set} rows={2} />
      <div className="sec-head">Requirement Confirmation</div>
      <F label="Approved Scope & Features" name="approvedScope" state={data} set={set} rows={3} />
      <div className="fgrid2">
        <F label="No. of Pages / Screens" name="numScreens" state={data} set={set} />
        <F label="User Roles" name="userRoles" state={data} set={set} />
      </div>
      <F label="Database Requirements" name="dbReq" state={data} set={set} />
      <F label="Security Requirements" name="securityReq" state={data} set={set} rows={2} />
      <div className="sec-head">Technical Implementation</div>
      <F label="Frontend Technology" name="frontend" state={data} set={set} />
      <F label="Backend Technology" name="backend" state={data} set={set} />
      <F label="Hosting Details" name="hosting" state={data} set={set} />
      <F label="API Integrations" name="apiInteg" state={data} set={set} rows={2} />
      <div className="sec-head">Timeline & Milestones</div>
      <div className="fgrid2">
        <F label="UI Design Completion" name="uiDesign" state={data} set={set} type="date" />
        <F label="Dev Start Date" name="devStart" state={data} set={set} type="date" />
      </div>
      <div className="fgrid2">
        <F label="Beta Testing Date" name="betaTest" state={data} set={set} type="date" />
        <F label="Final Deployment" name="finalDeploy" state={data} set={set} type="date" />
      </div>
      <div className="sec-head">Risks & Dependencies</div>
      <F label="Client Dependencies" name="clientDeps" state={data} set={set} rows={2} />
      <F label="Technical Risks" name="techRisks" state={data} set={set} rows={2} />
    </>
  );
}

function ImplDoc({ data }) {
  return (
    <div className="doc">
      <DocHeader title="IMPLEMENTATION" data={data} />
      <Section title="Basic Project Details">
        <Field label="Project ID" value={data.projectId} />
        <Field label="Project Manager" value={data.projectManager} />
        <Field label="Team Members Assigned" value={data.teamMembers} full />
      </Section>
      <Section title="Requirement Confirmation">
        <Field label="No. of Pages / Screens" value={data.numScreens} />
        <Field label="User Roles" value={data.userRoles} />
        <Field label="Approved Scope & Features" value={data.approvedScope} full />
        <Field label="Database Requirements" value={data.dbReq} full />
        <Field label="Security Requirements" value={data.securityReq} full />
      </Section>
      <Section title="Technical Implementation">
        <Field label="Frontend Technology" value={data.frontend} />
        <Field label="Backend Technology" value={data.backend} />
        <Field label="Hosting Details" value={data.hosting} full />
        <Field label="API Integrations" value={data.apiInteg} full />
      </Section>
      <Section title="Timeline & Milestones">
        <Field label="UI Design Completion" value={fmt(data.uiDesign)} />
        <Field label="Development Start" value={fmt(data.devStart)} />
        <Field label="Beta Testing Date" value={fmt(data.betaTest)} />
        <Field label="Final Deployment" value={fmt(data.finalDeploy)} />
      </Section>
      <Section title="Risks & Dependencies">
        <Field label="Client Dependencies" value={data.clientDeps} full />
        <Field label="Technical Risks" value={data.techRisks} full />
      </Section>
      <SigBlock />
      <DocFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORM 3 — DELIVERY ACCEPTANCE
───────────────────────────────────────────── */
const ALL_ITEMS = [
  "Source Code Shared","Database Backup Provided","Hosting Credentials Shared",
  "Admin Credentials Shared","User Manual Provided","Training Sessions Completed",
  "Testing/UAT Signed Off","Static Assets Handed Over",
];

function DeliveryForm({ data, set }) {
  function toggleItem(item) {
    const cur = data.deliveredItems || [];
    set({ ...data, deliveredItems: cur.includes(item) ? cur.filter(x => x !== item) : [...cur, item] });
  }
  return (
    <>
      <div className="sec-head">Document Info</div>
      <div className="fgrid2">
        <F label="Doc No" name="docNo" state={data} set={set} />
        <F label="Date" name="date" state={data} set={set} type="date" />
      </div>
      <div className="sec-head">Delivery Information</div>
      <div className="fgrid2">
        <F label="Delivery Date" name="deliveryDate" state={data} set={set} type="date" />
        <F label="Version Number" name="versionNo" state={data} set={set} />
      </div>
      <Sel label="Delivery Type" name="deliveryType" state={data} set={set} options={["Live Deployment","Source Code (Git)","APK / IPA File","Website Transfer","Admin Panel Access"]} />
      <F label="Delivered To" name="deliveredTo" state={data} set={set} />
      <div className="sec-head">Delivered Items Checklist</div>
      <div className="check-group">
        {ALL_ITEMS.map(item => (
          <label key={item} className="check-item" onClick={() => toggleItem(item)}>
            <input type="checkbox" readOnly checked={(data.deliveredItems || []).includes(item)} />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="sec-head">Acceptance & Warranty</div>
      <div className="fgrid2">
        <F label="Warranty Period" name="warrantyPeriod" state={data} set={set} />
        <F label="Support Expiry Date" name="supportExpiry" state={data} set={set} type="date" />
      </div>
      <F label="Pending Issues" name="pendingIssues" state={data} set={set} rows={2} />
      <F label="Support Terms" name="supportTerms" state={data} set={set} rows={2} />
      <div className="sec-head">Final Payment Details</div>
      <div className="fgrid2">
        <F label="Final Invoice (₹)" name="finalInvoice" state={data} set={set} type="number" />
        <F label="Pending Balance (₹)" name="pendingBalance" state={data} set={set} type="number" />
      </div>
      <Sel label="Payment Mode" name="paymentMode" state={data} set={set} options={["Bank Transfer","Stripe / PayPal","Cheque / DD","Cash"]} />
    </>
  );
}

function DeliveryDoc({ data }) {
  const items = data.deliveredItems || [];
  const inv = parseInt(data.finalInvoice) || 0;
  const bal = parseInt(data.pendingBalance) || 0;
  return (
    <div className="doc">
      <DocHeader title="DELIVERY ACCEPTANCE" data={data} />
      <Section title="Delivery Information">
        <Field label="Delivery Date" value={fmt(data.deliveryDate)} />
        <Field label="Version Number" value={data.versionNo} />
        <Field label="Delivery Type" value={data.deliveryType} />
        <Field label="Delivered To" value={data.deliveredTo} />
      </Section>
      <div className="doc-section">
        <div className="doc-sec-title">Delivered Items Checklist</div>
        <div className="checklist-grid">
          {ALL_ITEMS.map(item => {
            const on = items.includes(item);
            return (
              <div key={item} className={`checklist-item ${on ? "checked" : "unchecked"}`}>
                <div className={`check-icon ${on ? "on" : "off"}`}>{on ? "✓" : "✗"}</div>
                <span style={{ fontSize: "11px" }}>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Section title="Acceptance & Warranty">
        <Field label="Warranty / Support Period" value={data.warrantyPeriod} />
        <Field label="Support Expiry Date" value={fmt(data.supportExpiry)} />
        <Field label="Pending Issues" value={data.pendingIssues} full />
        <Field label="Support Terms" value={data.supportTerms} full />
      </Section>
      <Section title="Final Payment Details">
        <Field label="Final Invoice Amount" value={inv ? `₹ ${inv.toLocaleString("en-IN")}` : ""} />
        <Field label="Pending Balance" value={`₹ ${bal.toLocaleString("en-IN")}`} />
        <Field label="Payment Mode" value={data.paymentMode} />
      </Section>
      <SigBlock />
      <DocFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORM 4 — CHANGE REQUEST
───────────────────────────────────────────── */
function ChangeForm({ data, set }) {
  return (
    <>
      <div className="sec-head">Document Info</div>
      <div className="fgrid2">
        <F label="Doc No" name="docNo" state={data} set={set} />
        <F label="Date" name="date" state={data} set={set} type="date" />
      </div>
      <div className="sec-head">Request Details</div>
      <div className="fgrid2">
        <F label="Change Request ID" name="crId" state={data} set={set} />
        <F label="Request Date" name="requestDate" state={data} set={set} type="date" />
      </div>
      <F label="Requested By" name="requestedBy" state={data} set={set} />
      <Sel label="Priority Level" name="priority" state={data} set={set} options={["Low - Enhancement","Medium - Important","High - Critical","Urgent - Blocker"]} />
      <div className="sec-head">Change & Reason</div>
      <F label="Requested Change Description" name="changeDesc" state={data} set={set} rows={3} />
      <F label="Existing Feature Affected" name="featureAffected" state={data} set={set} />
      <F label="Reason for Change" name="reason" state={data} set={set} rows={2} />
      <div className="sec-head">Impact Analysis</div>
      <div className="fgrid2">
        <F label="Additional Cost (₹)" name="addCost" state={data} set={set} type="number" />
        <F label="Additional Time (Days)" name="addTime" state={data} set={set} type="number" />
      </div>
      <F label="Revised Delivery Date" name="revisedDelivery" state={data} set={set} type="date" />
      <F label="Technical Impact" name="techImpact" state={data} set={set} rows={2} />
      <F label="Areas Affected" name="areasAffected" state={data} set={set} />
    </>
  );
}

function ChangeDoc({ data }) {
  const pLevel = data.priority || "";
  const pClass = pLevel.startsWith("Low") ? "p-low" : pLevel.startsWith("Medium") ? "p-medium" : pLevel.startsWith("High") ? "p-high" : "p-urgent";
  const cost = parseInt(data.addCost) || 0;
  return (
    <div className="doc">
      <DocHeader title="CHANGE REQUEST" data={data} />
      <Section title="Request Details">
        <Field label="Change Request ID" value={data.crId} />
        <Field label="Request Date" value={fmt(data.requestDate)} />
        <Field label="Requested By" value={data.requestedBy} />
        <div className="doc-field">
          <div className="doc-field-label">Priority Level</div>
          <div className="doc-field-val">
            <span className={`priority ${pClass}`}>{data.priority || "—"}</span>
          </div>
        </div>
      </Section>
      <Section title="Change & Reason">
        <Field label="Requested Change Description" value={data.changeDesc} full />
        <Field label="Existing Feature Affected" value={data.featureAffected} full />
        <Field label="Reason for Change" value={data.reason} full />
      </Section>
      <Section title="Impact Analysis">
        <Field label="Additional Cost" value={cost ? `₹ ${cost.toLocaleString("en-IN")}` : ""} />
        <Field label="Additional Time" value={data.addTime ? `${data.addTime} days` : ""} />
        <Field label="Revised Delivery Date" value={fmt(data.revisedDelivery)} />
        <Field label="Technical Impact" value={data.techImpact} full />
        <Field label="Areas Affected" value={data.areasAffected} full />
      </Section>
      <div style={{ padding: "10px 14px", background: "#fff7ed", borderRadius: "6px", border: "1px solid #fed7aa", fontSize: "11px", color: "#c2410c", marginTop: "8px" }}>
        ⚠ This change request requires written approval before implementation. Unauthorized changes may affect project delivery timelines.
      </div>
      <SigBlock />
      <DocFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
const FORMS = [
  { id: "co", label: "Client Order", short: "Order" },
  { id: "impl", label: "Implementation", short: "Impl" },
  { id: "da", label: "Delivery Acceptance", short: "Delivery" },
  { id: "cr", label: "Change Request", short: "CR" },
];

export default function App() {
  const [activeForm, setActiveForm] = useState("co");
  const [mobileView, setMobileView] = useState("form");

  const [co, setCo] = useState(defaultClientOrder);
  const [impl, setImpl] = useState(defaultImpl);
  const [da, setDa] = useState(defaultDelivery);
  const [cr, setCr] = useState(defaultChange);

  function handlePrint() {
    const originalTitle = document.title;
    document.title = "";
    window.print();
    document.title = originalTitle;
  }

  const panels = {
    co: { form: <ClientOrderForm data={co} set={setCo} />, doc: <ClientOrderDoc data={co} /> },
    impl: { form: <ImplForm data={impl} set={setImpl} />, doc: <ImplDoc data={impl} /> },
    da: { form: <DeliveryForm data={da} set={setDa} />, doc: <DeliveryDoc data={da} /> },
    cr: { form: <ChangeForm data={cr} set={setCr} />, doc: <ChangeDoc data={cr} /> },
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-brand">
          <div className="topbar-logo">
            <img src={logo} alt="JOD TECH Logo" />
          </div>
          <div>
            <div className="topbar-title">JOD TECH Forms</div>
            <div className="topbar-sub">Professional IT Project Documentation</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className="btn-dl" onClick={handlePrint}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* DESKTOP FORM TABS */}
      <div className="form-tabs">
        {FORMS.map(f => (
          <div key={f.id} className={`form-tab${activeForm === f.id ? " active" : ""}`} onClick={() => setActiveForm(f.id)}>
            {f.label}
          </div>
        ))}
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="bottom-nav">
        {FORMS.slice(0, 2).map(f => (
          <div key={f.id} className={`nav-item${activeForm === f.id ? " active" : ""}`} onClick={() => { setActiveForm(f.id); setMobileView("form"); }}>
            {f.id === "co" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            )}
            <span>{f.short}</span>
          </div>
        ))}
        
        <div className={`nav-preview-btn${mobileView === "preview" ? " active" : ""}`} onClick={() => setMobileView(mobileView === "form" ? "preview" : "form")}>
          {mobileView === "form" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          )}
        </div>

        {FORMS.slice(2).map(f => (
          <div key={f.id} className={`nav-item${activeForm === f.id ? " active" : ""}`} onClick={() => { setActiveForm(f.id); setMobileView("form"); }}>
            {f.id === "da" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            )}
            <span>{f.short}</span>
          </div>
        ))}
      </div>

      {/* SPLIT VIEW */}
      <div className="split">
        <div className="pane-form" style={{ display: mobileView === "preview" ? "none" : "block" }}>
          {panels[activeForm].form}
        </div>
        <div className={`pane-preview ${mobileView === "form" ? "hide-mobile" : ""}`}>
          <div className="preview-wrap">
            {panels[activeForm].doc}
          </div>
        </div>
      </div>
    </>
  );
}
