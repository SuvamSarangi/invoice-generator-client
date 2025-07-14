import { useContext } from "react";
import { assets } from "../assets/assets.js";
import { Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
const InvoiceForm = () => {
  const { invoiceData, setInvoiceData } = useContext(AppContext);

  // add new items 
  const addItems = ()=>{
    setInvoiceData((prev)=>({
      ...prev,
      items :[...prev.items,
         {name:"",qty:"",amount:"",description:"",total:0},
      ]
    }))
  }

  // delete the items
  const deleteItems = (index)=>{
     const items = invoiceData.items.filter((_,i)=>i !== index);
    setInvoiceData((prev)=>({
      ...prev,items
    }));
  }

  // Update invoice form data(add new info)
  const handelChange = (section,field,value)=>{
    setInvoiceData((prev)=>({
        
      ...prev,
      [section]:{...prev[section],[field]:value}
    }));
  }

  //copy billing info to shiping field

  const handleSameAsBilling =()=>{
    setInvoiceData((prev)=>({
      ...prev,
      shipping :{...prev.billing}
    }));
  }

  const handelItemChange = (index,field,value)=>{
    const items = [...invoiceData.items];

    //assign value to particular index of particular field
    items[index][field]=value;
    
    if(field === "qty" || field === "amount"){
      items[index].total = (items[index].qty || 0) * (items[index].amount || 0 )
    }

    //update the state
    setInvoiceData((prev)=>({
      ...prev,
      items
    }))

  }

  const calculateTotals = ()=>{
    const subtotal = invoiceData.items.reduce((sum,item)=>sum + (item.total || 0),0);
    const taxRate = Number(invoiceData.tax || 0);
    const taxAmount = Number(subtotal * taxRate) /100;
    const grandTotal = subtotal + taxAmount;
    return {subtotal,taxAmount,grandTotal}
  }

  const {subtotal,taxAmount,grandTotal} = calculateTotals();

  return (
    <div className="invoiceForm container py-4">
      {/* company logo */}
      <div className="mb-4">
        <h5>Company logo</h5>
        <div className="d-flex align-items-center gap-3">
          <label htmlFor="image" className="form-label">
            <img src={assets.upload} alt="image" width={48} />
          </label>
          <input
            type="file"
            name="file"
            id="image"
            hidden
            className="form-control"
            accept="image/*"
          />
        </div>
      </div>

      {/* company info */}
      <div className="mb-4">
        <h5>Your company</h5>
        <div className="row g-3 ">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control "
              placeholder="company name"
              onChange={(e)=>handelChange("company","name",e.target.value)}
              value={invoiceData.company.name}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control "
              placeholder="company phone"
               onChange={(e)=>handelChange("company","phone",e.target.value)}
              value={invoiceData.company.phone}
            />
          </div>
          <div className="col-md-12  ">
            <input
              type="text"
              className="form-control "
              placeholder="company address"
               onChange={(e)=>handelChange("company","address",e.target.value)}
              value={invoiceData.company.address}
            />
          </div>
        </div>
      </div>

      {/* bill to */}
      <div className="mb-4">
        <h5>Bill To</h5>
        <div className="row g-3 ">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control "
              placeholder="company name"
               onChange={(e)=>handelChange("billing","name",e.target.value)}
               value={invoiceData.billing.name}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control "
              placeholder="company phone"
             onChange={(e)=>handelChange("billing","phone",e.target.value)}
              value={invoiceData.billing.phone}
            />
          </div>
          <div className="col-md-12  ">
            <input
              type="text"
              className="form-control "
              placeholder="company address"
              onChange={(e)=>handelChange("billing","address",e.target.value)}
              value={invoiceData.billing.address}
            />
          </div>
        </div>
      </div>

      {/* ship to */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Ship To</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsBilling"
              onChange={handleSameAsBilling}
            />
            <label htmlFor="sameAsBilling" className="form-check-label" >
              same As Billing
            </label>
          </div>
        </div>

        <div className="row g-3 ">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control "
              placeholder="company name"
              value={invoiceData.shipping.name}
              onChange={(e)=>handelChange("shipping","name",e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control "
              placeholder="company phone"
              onChange={(e)=>handelChange("shipping","phone",e.target.value)}
              value={invoiceData.shipping.phone}
            />
          </div>
          <div className="col-md-12  ">
            <input
              type="text"
              className="form-control "
              placeholder="company address"
              onChange={(e)=>handelChange("shipping","address",e.target.value)}
              value={invoiceData.shipping.address}
            />
          </div>
        </div>
      </div>

      {/* invoice info */}
      <div className="mb-4">
        <h5>invoice information</h5>
        <div className="row g-3 ">
          <div className="col-md-4">
            <label htmlFor="invoiceNumber" className="form-label">
              Invoice Number
            </label>
            <input
              type="text"
              className="form-control "
              placeholder="invoiceNumber"
              id="invoiceNumber"
              value={invoiceData.invoice.number}
              onChange={(e)=>handelChange("invoice","number",e.target.value)}

            />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date
            </label>
            <input type="date" 
            className="form-control "
             id="invoiceDate"
              value={invoiceData.invoice.date}
              onChange={(e)=>handelChange("invoice","date",e.target.value)}
              />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceDueDate" className="form-label">
              Invoice Due Date
            </label>
            <input type="date" 
            className="form-control "
             id="invoiceDueDate" 
               value={invoiceData.invoice.dueDate}
              onChange={(e)=>handelChange("invoice","dueDate",e.target.value)}
             />
          </div>
        </div>
      </div>

      {/* items details */}
      <div className="mb-4">
        <h5>Items Details</h5>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3 ">
                <input
                  type="text"
                  placeholder="Item name"
                  className="form-control"
                  value={item.name}
                  onChange={(e)=>handelItemChange(index,"name",e.target.value)}
                />
              </div>
              <div className="col-md-3 ">
                <input
                  type="number"
                  placeholder="qty"
                  className="form-control"
                  value={item.qty}
                  onChange={(e)=>handelItemChange(index,"qty",e.target.value)}
                />
              </div>
              <div className="col-md-3 ">
                <input
                  type="number"
                  placeholder="amount"
                  className="form-control"
                  value={item.amount}
                  onChange={(e)=>handelItemChange(index,"amount",e.target.value)}
                />
              </div>
              <div className="col-md-3 ">
                <input
                  type="number"
                  placeholder="total"
                  disabled
                  className="form-control"
                  value={item.total}
                  onChange={(e)=>handelItemChange(index,"total",e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={item.description}
                  onChange={(e)=>handelItemChange(index,"description",e.target.value)}
              ></textarea>
              {invoiceData.items.length > 1 && (
                <button className="btn btn-outline-danger" type="button" onClick={()=>deleteItems(index)}>
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>  
        ))}
        <button className="btn btn-primary" onClick={addItems}>Add Items</button>
      </div>

      {/* bank account details */}
      <div className="mb-4">
        <h5>Bank Details</h5>
        <div className="row g-3 ">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control "
              placeholder="Account Name"
               value={invoiceData.account.name}
              onChange={(e)=>handelChange("account","name",e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control "
              placeholder="Account Number"
               value={invoiceData.account.number}
              onChange={(e)=>handelChange("account","number",e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control "
              placeholder="Branch/IFSC Code"
               value={invoiceData.account.ifscCode}
              onChange={(e)=>handelChange("account","ifscCode",e.target.value)}
            />
          </div>
        </div>
      </div> 

      {/* totals */}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50 ">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="taxInput" className="me-2">
                Tax Rate(%)
              </label>
              <input
                type="number"
                id="taxInput"
                placeholder="2"
                className="form-control w-50 text-end "
                value={invoiceData.tax}
                onChange={(e)=>setInvoiceData((prev)=>({...prev,tax:e.target.value}))}
              />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax Amount</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* notes */}
      <div className="mb-4">
        <h5>Notes:</h5>
        <textarea name="notes" className="form-control" rows={3}></textarea>
      </div>
    </div>
  );
};

export default InvoiceForm;
