import React, { useContext, useRef, useState } from "react";
import InvoicePreview from "../components/InvoicePreview";
import { AppContext } from "../context/AppContext";
import { deleteInvoice, saveInvoice, sendInvoice } from "../service/invoiceService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";
import { generatePdfFormatElement } from "../util/pdfUtils";

const PreviewPage = () => {
  const previewRef = useRef();

  const { invoiceData, baseUrl, setInvoiceData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [customerEmail,setCustomerEmail] = useState("");
  const [emailing,setEmailing]= useState(false);
  const navigate = useNavigate();

  // save the invoice
  const handleSave = async () => {
    try {
      setLoading(true);

      //  take the screen short of the full invoice
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY: -window.scrollY,
      });
      const imageData = canvas.toDataURL("image/png");
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
      console.log("Payload before sending");
      const payload = {
        ...invoiceData,
        thumbnailUrl,
      };
      console.log("Payload after sending:", payload);
      const response = await saveInvoice(baseUrl, payload);
      if (response.status === 200) {
        toast.success("Invoice saved successfully");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      console.error(error);
      toast.error("failed to saved invoise", error.message);
    } finally {
      setLoading(false);
    }
  };

  // delete the invoice
  const handleDelete = async () => {
    try {
      const response = await deleteInvoice(baseUrl, invoiceData.id);
      if (response.status === 204) {
        toast.success("Invoice deleted successfully");
        navigate("/dashboard");
      } else {
        toast.error("Unable to delete invoice");
      }
    } catch (error) {
      toast.error("Failed to delete invoice ", error.message);
    }
  };

  // Download the invoice
  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true);
      await generatePdfFormatElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`
      );
    } catch (error) {
      toast.error("failed to download invoice");
    } finally {
      setDownloading(false);
    }
  };


  // send the invoice to customer email
  const handleSendEmail = async()=>{

    if (!previewRef.current || !customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
    return toast.error("Enter a valid email and try again !!");
  }
    try{
      setEmailing(true);
      const pdfBlob =await generatePdfFormatElement(previewRef.current,`invoice_${Date.now()}.pdf`,true);
      const formData = new FormData();
      formData.append("file",pdfBlob);
      formData.append("email",customerEmail);
      const response =  await sendInvoice(baseUrl,formData);
      if(response.status === 200){
        toast.success("Email sending successfully");
        setShowModel(false);
        setCustomerEmail("");
      }else{
        toast.error("failed to send email !!");
      }
    }catch(error){
      toast.error("failed to send email !",error.message);
    }finally{
      setEmailing(false);
    }
 
  }

  return (
    <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">
      {/* Action buttons */}
      <div className="d-flex flex-column  align-items-center mb-4 gap-3">
        {/* list of template buttons */}
        <div className="d-flex gap-2 flex-wrap justify-content-center"></div>

        {/* list of action buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={handleSave}
          >
            Save and Exit
          </button>
          {invoiceData.id && (
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Invoice
            </button>
          )}
          <button className="btn btn-secondary" onClick={()=>navigate("/dashboard")}>Back To Dashboard</button>
          <button className="btn btn-info" onClick={() => setShowModel(true)}>
            Send Email
          </button>
          <button
            className="btn btn-success d-flex align-items-center justify-content-center"
            disabled={loading}
            onClick={handleDownloadPdf}
          >
            {downloading && (
              <Loader2 className="me-2 spin-animation" size={18} />
            )}
            {downloading ? "downloading..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Display the invoice preview */}
      <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3 ">
        <div ref={previewRef} className="invoice-preview">
          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>

      {showModel && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="model-modal-title">Send Invoice</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModel(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Customer email"
                  onChange={(e)=> setCustomerEmail(e.target.value)}
                  value={customerEmail}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                  {emailing ? "Sending..." : "Send"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
