import React from 'react';
import { User, Briefcase, Calendar, DollarSign, PenTool } from 'lucide-react';

const ProjectOrderForm = () => {
  return (
    <div className="animate-fade">
      {/* 1. Client Information */}
      <h3 className="section-title"><User size={20} /> Client Information</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Client Company Name</label>
          <input type="text" placeholder="Enter company name" />
        </div>
        <div className="input-group">
          <label>Contact Person Name</label>
          <input type="text" placeholder="Enter contact name" />
        </div>
        <div className="input-group">
          <label>Designation</label>
          <input type="text" placeholder="e.g. CEO, Manager" />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="client@example.com" />
        </div>
        <div className="input-group">
          <label>GST Number / Tax ID</label>
          <input type="text" placeholder="Enter Tax ID" />
        </div>
        <div className="input-group full-width">
          <label>Company Address</label>
          <textarea placeholder="Complete mailing address"></textarea>
        </div>
        <div className="input-group full-width">
          <label>Website URL</label>
          <input type="url" placeholder="https://www.clientwebsite.com" />
        </div>
      </div>

      {/* PAGE BREAK: Project Info onto Page 2 */}
      <div className="html2pdf__page-break"></div>

      {/* 2. Project Information */}
      <h3 className="section-title"><Briefcase size={20} /> Project Information</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Project Name</label>
          <input type="text" placeholder="e.g. Mobile E-commerce" />
        </div>
        <div className="input-group">
          <label>Project Type</label>
          <select>
            <option>Web Application</option>
            <option>Mobile App (iOS/Android)</option>
            <option>Desktop Application</option>
            <option>CMS Development</option>
            <option>E-commerce Solution</option>
            <option>Custom Software</option>
          </select>
        </div>
        <div className="input-group full-width">
          <label>Project Description</label>
          <textarea placeholder="Briefly describe the project goals..."></textarea>
        </div>
        <div className="input-group full-width">
          <label>Scope of Work</label>
          <textarea placeholder="Detail the key deliverables..."></textarea>
        </div>
        <div className="input-group">
          <label>Modules Required</label>
          <input type="text" placeholder="e.g. Auth, Payment, Dashboard" />
        </div>
        <div className="input-group">
          <label>Technology Preference</label>
          <input type="text" placeholder="e.g. React, Node.js, Python" />
        </div>
        <div className="input-group">
          <label>Platform Type</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Web
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Mobile
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Desktop
            </label>
          </div>
        </div>
        <div className="input-group">
          <label>Number of Users</label>
          <input type="number" placeholder="Estimated user count" />
        </div>
      </div>

      {/* 3. Timeline Details */}
      <h3 className="section-title"><Calendar size={20} /> Timeline Details</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Project Start Date</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Expected Completion Date</label>
          <input type="date" />
        </div>
        <div className="input-group full-width">
          <label>Milestone Dates</label>
          <textarea placeholder="e.g. UI Design: 15th May, Beta: 20th June..."></textarea>
        </div>
      </div>

      {/* PAGE BREAK: Commercial onto Page 3 */}
      <div className="html2pdf__page-break"></div>

      {/* 4. Commercial Details */}
      <h3 className="section-title"><DollarSign size={20} /> Commercial Details</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Total Project Cost ($)</label>
          <input type="number" placeholder="0.00" />
        </div>
        <div className="input-group">
          <label>Advance Amount ($)</label>
          <input type="number" placeholder="0.00" />
        </div>
        <div className="input-group full-width">
          <label>Payment Terms</label>
          <textarea placeholder="e.g. 30% Advance, 40% Milestone 1..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProjectOrderForm;
