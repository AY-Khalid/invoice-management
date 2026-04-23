import { useState } from "react";
import "./Header.css"
import Button from "../buttons/Button.jsx";

export default function Header({ onNewInvoice, onFilterChange, activeFilters, invoice }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleCheck(status) {
    if (activeFilters.includes(status)) {
      onFilterChange(activeFilters.filter(s => s !== status));  // uncheck
    } else {
      onFilterChange([...activeFilters, status]);  // check
    }
  }

  return (
    <div className="header-container">
      <div className="left-header">
        <h1 className="lg-font">Invoices</h1>
            <p className="p-font">
            {invoice.length === 0
                ? "No invoices"
                : `There ${invoice.length === 1 ? "is" : "are"} ${invoice.length} total ${invoice.length === 1 ? "invoice" : "invoices"}`
            }
            </p>
      </div>
      <div className="right-header">
        <div className="header-filter">
          <div className="filter-point" onClick={() => setDropdownOpen(prev => !prev)}>
            <p className="p-font">Filter by Status</p>
            {dropdownOpen ? <i className="fa fa-angle-up"></i> : <i className="fa fa-angle-down"></i>}
          </div>

          {dropdownOpen && (
            <div className="filter-dropdown">
              <label htmlFor="draft">
                <input type="checkbox" id="draft" 
                  checked={activeFilters.includes("Draft")}
                  onChange={() => handleCheck("Draft")} 
                /> Draft
              </label>
              <label htmlFor="pending">
                <input type="checkbox" id="pending"
                  checked={activeFilters.includes("Pending")}
                  onChange={() => handleCheck("Pending")}
                /> Pending
              </label>
              <label htmlFor="paid">
                <input type="checkbox" id="paid"
                  checked={activeFilters.includes("Paid")}
                  onChange={() => handleCheck("Paid")}
                /> Paid
              </label>
            </div>
          )}
        </div>
        <Button
          appearance="purple-btn"
          font={<span className="round-plus"><i className="fa fa-plus"></i></span>}
          text="New Invoice"
          action={onNewInvoice}
        />
      </div>
    </div>
  );
};