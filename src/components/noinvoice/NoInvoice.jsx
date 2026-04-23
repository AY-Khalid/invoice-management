import noinvoice from "../../assets/noinvoice.png"
import "./NoInvoice.css"

export default function NoInvoice(){

    return (
        <div className="noinvoice-container">
            <img src={noinvoice} alt="" />
            <h2 className="md-font">There is nothing here</h2>
            <p className="p-font">Create an invoice by clicking the</p>
            <p className="p-font"><span>New Invoice</span> button and get started</p>
        </div>
    )
}