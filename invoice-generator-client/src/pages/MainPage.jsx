import React, { useContext, useState } from "react";
import { Pencil } from "lucide-react";
import { AppContext } from "../context/AppContext";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";
const MainPage = () => {
  const [isEditableTitle, setIsEditableTitle] = useState(false);

  // This grabs the value from the nearest <AppContext.Provider>
  const { invoiceTitle, setInvoiceTitle } = useContext(AppContext);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setInvoiceTitle(newTitle);
  };
  const handleTitleEdit = () => {
    setIsEditableTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditableTitle(false);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Title bar */}
        <div className="bg-white border rounded shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center">
            {isEditableTitle ? (
              <input
                type="text"
                className="form-control me-2"
                autoFocus
                onBlur={handleTitleBlur}
                onChange={handleTitleChange}
                value={invoiceTitle}
              />
            ) : (
              <>
                <h5 className="mb-0,me-2">{invoiceTitle}</h5>
                <button
                  className="btn btn-sm p-0 border-0 bg-transparent"
                  onClick={handleTitleEdit}
                >
                  <Pencil className="text-primary" size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Invoice form and template */}

        <div className="row g-4  align-items-stretch justify-content-center">
          {/* Invoice form */}

          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <InvoiceForm />
            </div>
          </div>

          {/* template grid */}
          {/* <div className='col-12 col-lg-6 d-flex'>
                     <div className='bg-white border rounded shadow-sm p-4 w-100'>
                          <TemplateGrid/>
                    </div>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
