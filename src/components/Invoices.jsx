import { useState, useEffect } from "react";
import Header from "./header/Header.jsx";
import Lists from "./lists/Lists.jsx";
import NoInvoice from "./noinvoice/NoInvoice.jsx";
import Form from "./form/Form.jsx";
import Button from "./buttons/Button.jsx";

const emptyFormData = {
  billFrom: { street: "", city: "", postal: "", country: "" },
  billTo: { name: "", email: "", street: "", city: "", postal: "", country: "" },
  invoiceDate: "",
  paymentTerms: "Net 7 days",
  projectDescription: "",
  items: []
};

function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randLetters = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
  const randNumbers = Math.floor(1000 + Math.random() * 9000);
  return `${randLetters}${randNumbers}`;
}

export default function Invoices({ onSelectInvoice }){
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyFormData);
  const [activeFilters, setActiveFilters] = useState([]);

  // Load invoices from localStorage, or start with empty array
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // Lock scroll when form is open
  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showForm]);

  function addItem() {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", qty: 1, price: 0 }]
    }));
  }

  function deleteItem(index) {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }

  function handleDiscard() {
    setFormData(emptyFormData); // reset form
    setShowForm(false);
  }

  function handleSaveAsDraft() {
    const newInvoice = {
      ...formData,
      id: generateId(),
      status: "Draft"     
    };
    setInvoices(prev => [...prev, newInvoice]);
    setFormData(emptyFormData);
    setShowForm(false);
  }

  function handleSaveAndSend() {
    const newInvoice = {
      ...formData,
      id: generateId(),
      status: "Pending"  
    };
    setInvoices(prev => [...prev, newInvoice]);
    setFormData(emptyFormData);
    setShowForm(false);
  }

 const filteredInvoices = activeFilters.length === 0
    ? invoices
    : invoices.filter(inv => activeFilters.includes(inv.status));

  return (
    <div className="invoice-container">
      <Header 
      onNewInvoice={() => setShowForm(true)} 
      onFilterChange={setActiveFilters}  
      activeFilters={activeFilters} 
      invoice = {invoices}
      />

      {filteredInvoices.length === 0 ? ( 
        <NoInvoice />
      ) : (
        filteredInvoices.map((invoice, index) => ( 
          <Lists key={index} invoice={invoice} onClick={() => onSelectInvoice(invoice)} />
        ))
      )}

      {showForm && (
        <div className="overlay">
          <Form
            formTitle={<>New Invoice</>}
            formData={formData}
            setFormData={setFormData}
            onAddItem={addItem}
            onDeleteItem={deleteItem}
            buttons={
              <>
                <Button appearance="grey-btn sm1-font" text="Discard" action={handleDiscard} />
                <Button appearance="dark-btn sm1-font" text="Save as Draft" action={handleSaveAsDraft} />
                <Button appearance="purple-btn sm1-font" text="Save & Send" action={handleSaveAndSend} />
              </>
            }
          />
        </div>
      )}
    </div>
  );
}