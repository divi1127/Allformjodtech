import React from 'react';

const DeliveryAcceptanceForm = () => {
  return (
    <div className="animate-fade">
      {/* 1. Project Delivery Information */}
      <h3 className="section-title">Delivery Information</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Delivery Date</label>
          <input type="date" />
        </div>
        <div className="input-group">
          <label>Version Number</label>
          <input type="text" placeholder="e.g. v1.0.2-stable" />
        </div>
        <div className="input-group">
          <label>Delivery Type</label>
          <select>
            <option>Live Deployment</option>
            <option>Source Code (Git)</option>
            <option>APK / IPA File</option>
            <option>Website Transfer</option>
            <option>Admin Panel Access</option>
          </select>
        </div>
        <div className="input-group">
          <label>Delivered To</label>
          <input type="text" placeholder="Contact Person Name" />
        </div>
      </div>

      {/* 2. Delivered Items Checklist */}
      <h3 className="section-title">Delivered Items Checklist</h3>
      <div className="form-grid">
        <div className="input-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Source Code Shared
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Database Backup Provided
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Hosting Credentials Shared
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Admin Credentials Shared
          </label>
        </div>
        <div className="input-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> User Manual Provided
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Training Sessions Completed
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Testing/UAT Signed Off
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
            <input type="checkbox" style={{ width: 'auto' }} /> Static Assets Handed Over
          </label>
        </div>
      </div>

      {/* 3. Client Acceptance Details */}
      <h3 className="section-title">Acceptance & Warranty</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Warranty / Support Period</label>
          <input type="text" placeholder="e.g. 3 Months, 1 Year" />
        </div>
        <div className="input-group">
          <label>Support Expiry Date</label>
          <input type="date" />
        </div>
        <div className="input-group full-width">
          <label>Pending Issues (if any)</label>
          <textarea placeholder="List any minor bugs or pending tasks..."></textarea>
        </div>
        <div className="input-group full-width">
          <label>Support Terms</label>
          <textarea placeholder="Specify what is covered in support..."></textarea>
        </div>
      </div>

      {/* PAGE BREAK: Payment and Signature onto Page 2 */}
      <div className="html2pdf__page-break"></div>

      {/* 4. Final Payment Details */}
      <h3 className="section-title">Final Payment Details</h3>
      <div className="form-grid">
        <div className="input-group">
          <label>Final Invoice Amount ($)</label>
          <input type="number" placeholder="0.00" />
        </div>
        <div className="input-group">
          <label>Pending Balance ($)</label>
          <input type="number" placeholder="0.00" />
        </div>
        <div className="input-group">
          <label>Payment Mode</label>
          <select>
            <option>Bank Transfer</option>
            <option>Stripe / PayPal</option>
            <option>Cheque / DD</option>
            <option>Cash</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAcceptanceForm;
