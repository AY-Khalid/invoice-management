import Button from "../buttons/Button";
import { useState } from "react";
import "./Form.css";

export default function Form(props) {
  const { formData, setFormData } = props;
  const [errors, setErrors] = useState({});

  function handleChange(path, value) {
    setFormData((prev) => {
      const copy = structuredClone(prev);
      let obj = copy;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]];
      }
      obj[path[path.length - 1]] = value;
      return copy;
    });

    // clear error on change
    const key = path.join(".");
    setErrors(prev => ({ ...prev, [key]: "" }));
  }

  function validate() {
    const e = {};
    if (!formData.billFrom.street.trim()) e["billFrom.street"] = "Can't be empty";
    if (!formData.billFrom.city.trim()) e["billFrom.city"] = "Can't be empty";
    if (!formData.billFrom.postal.trim()) e["billFrom.postal"] = "Can't be empty";
    if (!formData.billFrom.country.trim()) e["billFrom.country"] = "Can't be empty";
    if (!formData.billTo.name.trim()) e["billTo.name"] = "Can't be empty";
    if (!formData.billTo.email.trim()) e["billTo.email"] = "Can't be empty";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billTo.email)) e["billTo.email"] = "Invalid email";
    if (!formData.billTo.street.trim()) e["billTo.street"] = "Can't be empty";
    if (!formData.billTo.city.trim()) e["billTo.city"] = "Can't be empty";
    if (!formData.billTo.postal.trim()) e["billTo.postal"] = "Can't be empty";
    if (!formData.billTo.country.trim()) e["billTo.country"] = "Can't be empty";
    if (!formData.invoiceDate) e["invoiceDate"] = "Can't be empty";
    if (!formData.projectDescription.trim()) e["projectDescription"] = "Can't be empty";
    if (formData.items.length === 0) e["items"] = "Add at least one item";
    formData.items.forEach((item, i) => {
      if (!item.name.trim()) e[`items.${i}.name`] = "Can't be empty";
      if (!item.qty || item.qty <= 0) e[`items.${i}.qty`] = "Must be > 0";
      if (!item.price || item.price <= 0) e[`items.${i}.price`] = "Must be > 0";
    });
    return e;
  }

  // exposed so parent buttons can trigger validation
  function handleValidatedAction(action) {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    action?.();
  }

  const err = (key) => errors[key]
    ? <span className="error-msg" role="alert">{errors[key]}</span>
    : null;

  const inputClass = (key) => errors[key] ? "input-error" : "";

  return (
    <div className="form-container" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <h2 className="md-font form-rcpt-no" id="form-title">{props.formTitle}</h2>

      <form noValidate>

        {/* BILL FROM */}
        <fieldset>
          <legend>Bill From</legend>

          <label className="p-font" htmlFor="from-street">Street Address</label>
          <input id="from-street" type="text" value={formData.billFrom.street}
            className={inputClass("billFrom.street")}
            aria-invalid={!!errors["billFrom.street"]}
            aria-describedby="from-street-err"
            onChange={(e) => handleChange(["billFrom", "street"], e.target.value)}
          />
          <span id="from-street-err">{err("billFrom.street")}</span>

          <div className="city-postal-country">
            <div>
              <label className="p-font" htmlFor="from-city">City</label>
              <input id="from-city" type="text" value={formData.billFrom.city}
                className={inputClass("billFrom.city")}
                aria-invalid={!!errors["billFrom.city"]}
                aria-describedby="from-city-err"
                onChange={(e) => handleChange(["billFrom", "city"], e.target.value)}
              />
              <span id="from-city-err">{err("billFrom.city")}</span>
            </div>
            <div>
              <label className="p-font" htmlFor="from-postal">Postal</label>
              <input id="from-postal" type="text" value={formData.billFrom.postal}
                className={inputClass("billFrom.postal")}
                aria-invalid={!!errors["billFrom.postal"]}
                aria-describedby="from-postal-err"
                onChange={(e) => handleChange(["billFrom", "postal"], e.target.value)}
              />
              <span id="from-postal-err">{err("billFrom.postal")}</span>
            </div>
            <div>
              <label className="p-font" htmlFor="from-country">Country</label>
              <input id="from-country" type="text" value={formData.billFrom.country}
                className={inputClass("billFrom.country")}
                aria-invalid={!!errors["billFrom.country"]}
                aria-describedby="from-country-err"
                onChange={(e) => handleChange(["billFrom", "country"], e.target.value)}
              />
              <span id="from-country-err">{err("billFrom.country")}</span>
            </div>
          </div>
        </fieldset>

        {/* BILL TO */}
        <fieldset>
          <legend>Bill To</legend>

          <label className="p-font" htmlFor="to-name">Client Name</label>
          <input id="to-name" type="text" value={formData.billTo.name}
            className={inputClass("billTo.name")}
            aria-invalid={!!errors["billTo.name"]}
            aria-describedby="to-name-err"
            onChange={(e) => handleChange(["billTo", "name"], e.target.value)}
          />
          <span id="to-name-err">{err("billTo.name")}</span>

          <label className="p-font" htmlFor="to-email">Client Email</label>
          <input id="to-email" type="email" value={formData.billTo.email}
            className={inputClass("billTo.email")}
            aria-invalid={!!errors["billTo.email"]}
            aria-describedby="to-email-err"
            onChange={(e) => handleChange(["billTo", "email"], e.target.value)}
          />
          <span id="to-email-err">{err("billTo.email")}</span>

          <label className="p-font" htmlFor="to-street">Street Address</label>
          <input id="to-street" type="text" value={formData.billTo.street}
            className={inputClass("billTo.street")}
            aria-invalid={!!errors["billTo.street"]}
            aria-describedby="to-street-err"
            onChange={(e) => handleChange(["billTo", "street"], e.target.value)}
          />
          <span id="to-street-err">{err("billTo.street")}</span>

          <div className="city-postal-country">
            <div>
              <label className="p-font" htmlFor="to-city">City</label>
              <input id="to-city" type="text" value={formData.billTo.city}
                className={inputClass("billTo.city")}
                aria-invalid={!!errors["billTo.city"]}
                aria-describedby="to-city-err"
                onChange={(e) => handleChange(["billTo", "city"], e.target.value)}
              />
              <span id="to-city-err">{err("billTo.city")}</span>
            </div>
            <div>
              <label className="p-font" htmlFor="to-postal">Postal</label>
              <input id="to-postal" type="text" value={formData.billTo.postal}
                className={inputClass("billTo.postal")}
                aria-invalid={!!errors["billTo.postal"]}
                aria-describedby="to-postal-err"
                onChange={(e) => handleChange(["billTo", "postal"], e.target.value)}
              />
              <span id="to-postal-err">{err("billTo.postal")}</span>
            </div>
            <div>
              <label className="p-font" htmlFor="to-country">Country</label>
              <input id="to-country" type="text" value={formData.billTo.country}
                className={inputClass("billTo.country")}
                aria-invalid={!!errors["billTo.country"]}
                aria-describedby="to-country-err"
                onChange={(e) => handleChange(["billTo", "country"], e.target.value)}
              />
              <span id="to-country-err">{err("billTo.country")}</span>
            </div>
          </div>

          <div className="date-terms">
            <div className="invoice-date">
              <label className="p-font" htmlFor="invoice-date">Invoice Date</label>
              <input id="invoice-date" type="date" value={formData.invoiceDate}
                className={inputClass("invoiceDate")}
                aria-invalid={!!errors["invoiceDate"]}
                aria-describedby="invoice-date-err"
                onChange={(e) => handleChange(["invoiceDate"], e.target.value)}
              />
              <span id="invoice-date-err">{err("invoiceDate")}</span>
            </div>
            <div className="payment-terms">
              <label className="p-font" htmlFor="payment-terms">Payment Terms</label>
              <select id="payment-terms" value={formData.paymentTerms}
                onChange={(e) => handleChange(["paymentTerms"], e.target.value)}
              >
                <option value="Net 4 days">Net 4 days</option>
                <option value="Net 7 days">Net 7 days</option>
                <option value="Net 12 days">Net 12 days</option>
              </select>
            </div>
          </div>

          <label className="p-font" htmlFor="project-desc">Project Description</label>
          <input id="project-desc" type="text" value={formData.projectDescription}
            className={inputClass("projectDescription")}
            aria-invalid={!!errors["projectDescription"]}
            aria-describedby="project-desc-err"
            onChange={(e) => handleChange(["projectDescription"], e.target.value)}
          />
          <span id="project-desc-err">{err("projectDescription")}</span>
        </fieldset>

        {/* ITEMS */}
        <fieldset>
          <legend>Item List</legend>
          {errors["items"] && (
            <span className="error-msg" role="alert">{errors["items"]}</span>
          )}

          <div className="item-list-container">
            <div className="item-header" aria-hidden="true">
              <p className="p2-font">Item Name</p>
              <p className="p2-font">Qty.</p>
              <p className="p2-font">Price</p>
              <p className="p2-font">Total</p>
            </div>

            {formData.items.map((item, index) => (
              <div className="item-values" key={index} role="group" aria-label={`Item ${index + 1}`}>
                <div>
                  <input type="text" value={item.name}
                    aria-label={`Item ${index + 1} name`}
                    className={inputClass(`items.${index}.name`)}
                    aria-invalid={!!errors[`items.${index}.name`]}
                    onChange={(e) => handleChange(["items", index, "name"], e.target.value)}
                  />
                  {err(`items.${index}.name`)}
                </div>
                <div>
                  <input type="number" value={item.qty}
                    aria-label={`Item ${index + 1} quantity`}
                    className={inputClass(`items.${index}.qty`)}
                    aria-invalid={!!errors[`items.${index}.qty`]}
                    onChange={(e) => handleChange(["items", index, "qty"], e.target.value)}
                  />
                  {err(`items.${index}.qty`)}
                </div>
                <div>
                  <input type="number" value={item.price}
                    aria-label={`Item ${index + 1} price`}
                    className={inputClass(`items.${index}.price`)}
                    aria-invalid={!!errors[`items.${index}.price`]}
                    onChange={(e) => handleChange(["items", index, "price"], e.target.value)}
                  />
                  {err(`items.${index}.price`)}
                </div>
                <input type="number" value={item.qty * item.price} disabled
                  aria-label={`Item ${index + 1} total`}
                />
                <i className="fa-solid fa-trash" role="button"
                  aria-label={`Delete item ${index + 1}`}
                  tabIndex={0}
                  onClick={() => props.onDeleteItem(index)}
                  onKeyDown={(e) => e.key === "Enter" && props.onDeleteItem(index)}
                />
              </div>
            ))}
          </div>
        </fieldset>
      </form>

      <Button
        font={<i className="fa fa-plus"></i>}
        appearance="grey100"
        text="Add Items"
        action={props.onAddItem}
      />

      {/* intercept save buttons to run validation first, pass discard/cancel through */}
      <div className="form-buttons">
        {props.buttons && props.buttons.props?.children
          ? props.buttons.props.children.map((btn, i) => {
              if (!btn) return null;
              const isSkipped = btn.props.text === "Discard" || btn.props.text === "Cancel";
              if (isSkipped) return btn;
              return (
                <Button key={i}
                  appearance={btn.props.appearance}
                  text={btn.props.text}
                  action={() => handleValidatedAction(btn.props.action)}
                />
              );
            })
          : props.buttons
        }
      </div>
    </div>
  );
}