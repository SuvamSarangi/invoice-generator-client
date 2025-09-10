import React, { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";

const InvoicePreview = forwardRef(({ invoiceData }, ref) => {
  const formattedData = formatInvoiceData(invoiceData);
  return (
    <div
      ref={ref}
      className="invoice-preview container px-2 py-2 overflow-x-auto"
    >
      {/* render the PDF */}
      <div className="template1 border rounded mx-auto  my-4 px-sm-4 py-4 w-100">
        {/* Header Section */}
        <div className="row mb-4 border">
          <div className="col-md-6 mb-3 mb-md-0">
            {formattedData.companyLogo && (
              <div className="mb-2">
                <img
                  src={formattedData.companyLogo}
                  alt="company logo"
                  width={98}
                />
              </div>
            )}
            <h2 className="mb-1 company-title">{formattedData.companyName}</h2>
            <p className="mb-1">{formattedData.companyAddress}</p>
            <p className="mb-0">Phone: {formattedData.companyPhone}</p>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <h1 className="mb-2 invoice-title">{formattedData.title}</h1>
            <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2 gap-md-4 ">
              <div className="w-100 w-md-50 mb-3 mb-md-0">
                <p className="mb-1">
                  <strong>Invoice Number:</strong>
                  {formattedData.invoiceNumber}
                </p>
                <p className="mb-1">
                  <strong>Invoice Date:</strong>
                  {formattedData.invoiceDate}
                </p>
                <p className="mb-1">
                  <strong>Due Date:</strong>
                  {formattedData.paymentDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3 border-danger" />
        {/* Billing Section */}
        <div className="row g-3 mb-4 border-2">
          {formattedData.shippingName &&
            formattedData.shippingPhone &&
            formattedData.shippingAddress && (
              <div className="col-md-6">
                <div className="p-3 rounded h-100 billing-box">
                  <h3 className="mb-2 billing-title">Shipped To</h3>
                  <p className="mb-1">
                    <strong>{formattedData.shippingName}</strong>
                  </p>
                  <p className="mb-0">{formattedData.shippingAddress}</p>
                  <p className="mb-1">Phone: {formattedData.shippingPhone}</p>
                </div>
              </div>
            )}

          <div className="col-md-6">
            <div className="p-3 rounded h-100 billing-box bg-light">
              <h3 className="mb-2 billing-title">Billing To</h3>
              <p className="mb-1">
                <strong>{formattedData.billingName}</strong>
              </p>
              <p className="mb-0">{formattedData.billingAddress}</p>
              <p className="mb-1">Phone: {formattedData.billingPhone}</p>
            </div>
          </div>
        </div>
        {/* Items Section */}
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="p-2 table-header bg-primary">
                    Item/Item description
                  </th>
                  <th className="p-2 text-center bg-primary">Qty.</th>
                  <th className="p-2 text-end bg-primary">Rate</th>
                  <th className="p-2 text-end bg-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                {formattedData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{Number(item.qty)}</td>
                    <td className="p-2">{Number(item.amount)?.toFixed(2)}</td>
                    <td className="p-2">
                      ₹{(Number(item.qty) * Number(item.amount)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*Totals Section */}
        <div className="mb-4">
          <div className="d-flex justify-content-end">
            <div className="p-3 w-100 " style={{ maxWidth: "300px" }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Sub Total:</span>
                <span>₹{formattedData.subtotal.toFixed(2)}</span>
              </div>
              {formattedData.tax > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax({formattedData.tax}%):</span>
                  <span>{formattedData.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between fw-bold ">
                <span>Total: </span>
                <span>{formattedData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bank account Section */}

        {(formattedData.accountName ||
          formattedData.accountNumber ||
          formattedData.accountIfscCode) && (
          <div className="mt-4">
            <h3 className="mb-2">Banck Account Details</h3>
            {formattedData.accountName && (
              <p className="mb-1">
                <strong>Account Holder: </strong>
                {formattedData.accountName}
              </p>
            )}
            {formattedData.accountNumber && (
              <p className="mb-1">
                <strong>Account Number: </strong>
                {formattedData.accountNumber}
              </p>
            )}
            {formattedData.accountIfscCode && (
              <p className="mb-1">
                <strong>Ifsc/Branch code: </strong>
                {formattedData.accountIfscCode}
              </p>
            )}
          </div>
        )}

        {/*Note Section */}
        {formattedData.notes && (
          <div className="mt-4">
            <h3 className="mb-2">Remark</h3>
            <p className="mb-0">{formattedData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default InvoicePreview;
