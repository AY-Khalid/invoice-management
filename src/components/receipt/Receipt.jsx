import { useState, useEffect } from "react"
import Button from "../buttons/Button.jsx"
import Form from "../form/Form.jsx"
import "./Receipt.css"


export default function Receipt({ onGoBack, invoice, onDelete, onUpdate }){

            const emptyItem = {
                    name: "",
                    qty: 1,
                    price: 0
                    };

            const [receipt, setReceipt] = useState(invoice);
            const [formData, setFormData] = useState(invoice);
                        
            const [editForm, setEditForm] = useState(false);
            const [showDelete, setShowDelete] = useState(false);


            function openDelete() {
            setShowDelete(true);
            }

            function closeDelete() {
            setShowDelete(false);
            }

            function deleteReceipt() {
            // localStorage.removeItem("receipt");
            // setReceipt(null);
            onDelete(receipt.id); 
            setShowDelete(false);
            onGoBack(); 
            }

            function showForm() {
            setFormData(receipt);
            setEditForm(true);
            }

            function cancelForm() {
            setFormData(receipt);
            setEditForm(false);
            }

            function saveChanges() {
            setReceipt(formData);
            setEditForm(false);
            }
            
            function addItem() {
            setFormData(prev => ({
                ...prev,
                items: [...prev.items, emptyItem]
            }));
            }

            function deleteItem(index) {
                setFormData(prev => ({
                    ...prev,
                    items: prev.items.filter((_, i) => i !== index)
                }));
            }
        useEffect(() => {
                if (editForm || showDelete) {
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "auto";
                }

                return () => {
                    document.body.style.overflow = "auto";
                };
            }, [editForm, showDelete]);

        useEffect(() => {
            if (receipt) { 
                localStorage.setItem("receipt", JSON.stringify(receipt));
            }
        }, [receipt]);

        if (!receipt) return null;


         function markAsPaid() {
            const updatedReceipt = { ...receipt, status: "Paid" };
            setReceipt(updatedReceipt); 
            onUpdate(updatedReceipt);   
        } 

        return (
            <div className="receipt-container">

            {/* HEADER */}
            <div className="go-back" onClick={onGoBack}> 
                <i className="fa fa-angle-left"></i>
                <p className="p1-font">Go back</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="action">
                <div className="action-left">
                <p>Status</p>
                <div className={`status-${receipt.status.toLowerCase()}`}>
                    <i className="fa-solid fa-circle"></i>
                    <p>{receipt.status}</p> 
                </div>
                </div>

                <div className="action-right">
                <Button appearance="grey-btn" text="Edit" action={showForm} />
                <Button appearance="danger-btn" text="Delete" action={openDelete}/>
                <Button appearance="purple-btn" text="Mark as Paid" action={markAsPaid}  />
                </div>
            </div>

            {/* RECEIPT BODY */}
            <div className="receipt-body">

                <div className="receipt-body-top">

                <div className="top">
                    <div className="rcpt-no">
                        <h2 className="sm2-font">
                            <span>#</span>{receipt.id}
                    </h2>
                    <p className="p-font">{receipt.projectDescription}</p>
                    </div>

                    <div className="rcpt-address p-font">
                    <p>{receipt.billFrom.street}</p>
                    <p>{receipt.billFrom.city} {receipt.billFrom.postal}</p>
                    <p>{receipt.billFrom.country}</p>
                    </div>
                </div>

                <div className="bottom">

                    <div className="rcpt-date">
                    <div className="rcpt-invoice-date">
                        <p className="p-font">Invoice Date</p>
                        <h3 className="sm1-font">{receipt.invoiceDate}</h3>
                    </div>

                    <div className="rcpt-payment-due">
                        <p className="p-font">Payment Terms</p>
                        <h3 className="sm1-font">{receipt.paymentTerms}</h3>
                    </div>
                    </div>

                    <div className="rcpt-billto">
                    <p className="p-font">Bill To</p>
                    <h3 className="sm1-font">{receipt.billTo.name}</h3>
                    <p className="p-font">
                        {receipt.billTo.street} {receipt.billTo.city} {receipt.billTo.postal} {receipt.billTo.country}
                    </p>
                    </div>

                    <div className="rcpt-sentto">
                    <p className="p-font">Sent To</p>
                    <h3 className="sm1-font">{receipt.billTo.email}</h3>
                    </div>

                </div>
                </div>

                {/* ITEMS */}
                <div className="receipt-body-bottom">

                <div className="top">
                    <table>
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Qty.</th>
                        <th className="price-head">Price</th>
                        <th className="total-head">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {receipt.items.map((item, index) => (
                        <tr key={index}>
                            <td className="item-name">{item.name}</td>
                            <td className="qty">{item.qty}</td>
                            <td className="price">£{item.price}</td>
                            <td className="total">
                            £{item.qty * item.price}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <div className="bottom">
                    <p className="p-font">Amount Due</p>
                    <p className="rcpt-total-amount">
                    £
                    {receipt.items.reduce(
                        (sum, item) => sum + item.qty * item.price,
                        0
                    )}
                    </p>
                </div>

                </div>
            </div> 
        {editForm &&  
        <div className="overlay">   
            <Form 
                formTitle={<>Edit <span>#</span> {receipt.id}</>}
                formData={formData}
                setFormData={setFormData}
                buttons={
                    <>
                    <Button action={cancelForm} appearance="grey-btn sm1-font" text="Cancel" />
                    <Button action={saveChanges} appearance="purple-btn sm1-font" text="Save Changes" />
                    </>
                }
                onAddItem={addItem}
                onDeleteItem={deleteItem}
            />
        </div>
        }
    {showDelete && (
        <div className="overlay">
            <div className="delete-receipt">
                <h2>Confirm Deletion</h2>
                <p className="p-font">Are you sure you want to delete invoice #{receipt.id}? This action cannot be undone </p>
                <div className="delete-receipt-btn">
                    <Button appearance="grey-btn" text="Cancel" action={closeDelete}/>
                    <Button appearance="danger-btn" text="Delete" action={deleteReceipt} />
                </div>
            </div>
        </div>
    )}
        </div>
    )
}