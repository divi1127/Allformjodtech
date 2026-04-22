import React from 'react';

const ChangeOrderForm = () => {
  return (
    <div className="animate-fade">
      {/* 1. Basic Details */}
      <h3 className="section-title">Request Details</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Change Request ID</label>
          <input type="text" placeholder="CR-2024-001" />
        </div>
        <div className="input-group">
          <label>Request Date</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Requested By</label>
          <input type="text" placeholder="Client Contact Name" />
        </div>
        <div className="input-group">
          <label>Priority Level</label>
          <select>
            <option>Low - Enhancement</option>
            <option>Medium - Important</option>
            <option>High - Critical</option>
            <option>Urgent - Blocker</option>
          </select>
        </div>
      </div>

      {/* 2. Change Details */}
      <h3 className="section-title">Change & Reason</h3>
      <div className="form-grid">
        <div className="input-group full-width">
          <label>Requested Change Description</label>
          <textarea placeholder="Describe the new requirement or modification..."></textarea>
        </div>
        <div className="input-group full-width">
          <label>Existing Feature Affected</label>
          <input type="text" placeholder="e.g. Checkout process, Dashboard widgets" />
        </div>
        <div className="input-group full-width">
          <label>Reason for Change</label>
          <textarea placeholder="Explain why this change is necessary (Client request, legal, etc.)..."></textarea>
        </div>
      </div>

      {/* 3. Impact Analysis */}

      <h3 className="section-title">Impact Analysis</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Additional Cost ($)</label>
          <input type="number" placeholder="0.00" />
        </div>
        <div className="input-group">
          <label>Additional Time (Days)</label>
          <input type="number" placeholder="e.g. 5" />
        </div>
        <div className="input-group">
          <label>Revised Delivery Date</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Technical Impact</label>
          <input type="text" placeholder="e.g. DB Schema, API Change" />
        </div>
        <div className="input-group full-width">
          <label>Areas Affected</label>
          <textarea placeholder="List all screens, modules, and tests that need updating..."></textarea>
        </div>
      </div>

    </div>

  );
};

export default ChangeOrderForm;
