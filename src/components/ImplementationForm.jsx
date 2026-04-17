import React from 'react';
import { Settings, Info, Layers, Cpu, AlertTriangle, CheckSquare } from 'lucide-react';

const ImplementationForm = () => {
  return (
    <div className="animate-fade">
      {/* 1. Basic Project Details */}
      <h3 className="section-title"><Info size={20} /> Basic Project Details</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Project ID</label>
          <input type="text" placeholder="PRJ-2024-001" />
        </div>
        <div className="input-group">
          <label>Project Manager</label>
          <input type="text" placeholder="Name of Manager" />
        </div>
        <div className="input-group full-width">
          <label>Team Members Assigned</label>
          <textarea placeholder="e.g. Alice (Lead), Bob (Backend), Eve (UI)"></textarea>
        </div>
      </div>

      {/* 2. Requirement Confirmation */}
      <h3 className="section-title"><CheckSquare size={20} /> Requirement Confirmation</h3>
      <div className="form-grid">
        <div className="input-group full-width">
          <label>Approved Scope & Features</label>
          <textarea placeholder="Summarize final approved scope..."></textarea>
        </div>
        <div className="input-group">
          <label>Number of Pages / Screens</label>
          <input type="number" placeholder="e.g. 15 Screens" />
        </div>
        <div className="input-group">
          <label>User Roles</label>
          <input type="text" placeholder="e.g. Admin, Customer, Vendor" />
        </div>
        <div className="input-group">
          <label>Database Requirements</label>
          <input type="text" placeholder="e.g. MongoDB, PostgreSQL" />
        </div>
        <div className="input-group">
          <label>Security Requirements</label>
          <input type="text" placeholder="e.g. OAuth2, SSL, JWT" />
        </div>
      </div>

      {/* 3. Technical Implementation Details */}

      <h3 className="section-title"><Cpu size={20} /> Technical Implementation</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Frontend Technology</label>
          <input type="text" placeholder="React, Vue, Next.js" />
        </div>
        <div className="input-group">
          <label>Backend Technology</label>
          <input type="text" placeholder="Node.js, Python, Go" />
        </div>
        <div className="input-group">
          <label>Hosting Details</label>
          <input type="text" placeholder="AWS, Azure, Vercel" />
        </div>
        <div className="input-group">
          <label>API Integrations</label>
          <input type="text" placeholder="Stripe, Twilio, SendGrid" />
        </div>
      </div>

      {/* PAGE BREAK: Timeline, Risks, and Signatures onto Page 2 */}
      <div className="html2pdf__page-break"></div>

      {/* 4. Timeline and Milestones */}

      <h3 className="section-title"><Layers size={20} /> Timeline & Milestones</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>UI Design Completion</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Development Start Date</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Beta Testing Date</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Final Deployment Date</label>
          <input type="date" />
        </div>
      </div>

      {/* 5. Risks and Dependencies */}
      <h3 className="section-title"><AlertTriangle size={20} /> Risks & Dependencies</h3>
      <div className="form-grid">
        <div className="input-group full-width">
          <label>Client Dependencies</label>
          <textarea placeholder="e.g. Pending API credentials from client, content for about page..."></textarea>
        </div>
        <div className="input-group full-width">
          <label>Technical Risks</label>
          <textarea placeholder="Potential bottlenecks or risks..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default ImplementationForm;
