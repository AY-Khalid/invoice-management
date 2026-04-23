import "./List.css"

export default function Lists({ invoice, onClick }) { 
  const total = invoice.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="list-container" onClick={onClick}>
      <h2><span className="hash">#</span>{invoice.id}</h2>
      <time className="p-font" dateTime={invoice.invoiceDate}>{invoice.invoiceDate}</time>
      <p className="details p-font">{invoice.billTo.name}</p>
      <p className="amount">£{total.toFixed(2)}</p>
      <div className="status">
        <span className={`status-${invoice.status.toLowerCase()}`} >
          <i className="fa-solid fa-circle"></i>
          <p>{invoice.status}</p>
        </span>
        <i className="fa fa-angle-right"></i>
      </div>
    </div>
  )
}