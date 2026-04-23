import { useState } from 'react'
import './App.css'
import './custom.css'
import Aside from './components/aside.jsx'
import Receipt from './components/receipt/Receipt.jsx'
import Invoices from './components/Invoices.jsx'

function App() {
  const [view, setView] = useState('invoices')
  const [selectedInvoice, setSelectedInvoice] = useState(null)

    function handleDeleteInvoice(id) {
      const saved = localStorage.getItem("invoices");
      const invoices = saved ? JSON.parse(saved) : [];
      const updated = invoices.filter(inv => inv.id !== id);
      localStorage.setItem("invoices", JSON.stringify(updated));
      setView('invoices');
    }

    function handleUpdateInvoice(updatedInvoice) {
      const saved = localStorage.getItem("invoices");
      const invoices = saved ? JSON.parse(saved) : [];
      const updated = invoices.map(inv => 
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      );
      localStorage.setItem("invoices", JSON.stringify(updated));
      setSelectedInvoice(updatedInvoice); 
    }

  return (
    <div className="main-container">
      <Aside />
      {view === 'receipt' ? (
        <Receipt 
          onGoBack={() => setView('invoices')} 
          invoice={selectedInvoice}  
          onDelete={handleDeleteInvoice}    
          onUpdate={handleUpdateInvoice}       
        />
      ) : (
        <Invoices onSelectInvoice={(invoice) => {  
          setSelectedInvoice(invoice)
          setView('receipt')
        }} />
      )}
    </div>
  )
}

export default App