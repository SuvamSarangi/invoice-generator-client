import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { getAllInvoices } from '../service/invoiceService';
import toast from 'react-hot-toast';
import { Plus, Pointer } from "lucide-react";
import { formatDate } from '../util/formatInvoiceData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const DashBoard = () => {

const[invoices,setInvoices] = useState([]);

const {baseUrl,setInvoiceData} = useContext(AppContext)
const navigate = useNavigate();
const {getToken} = useAuth();

useEffect( () =>{ 
    const fetchInvoices = async()=>{
      try{
        const token = await getToken();
        const response = await getAllInvoices(baseUrl,token);
        setInvoices(response.data);
      }catch(error){
        toast.error("Failed to load the invoices",error);
      }
    }

    fetchInvoices(); 
},[baseUrl])

  const handleViewOnClick =(invoices)=>{
    setInvoiceData(invoices)
    navigate("/preview")
}
const createNewInvoice=()=>{
navigate("/generate")
}
  return (
    <div className='container py-5'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4'>
          {/* create new invoices */}
          <div className='col'>
            <div className='card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm' style={{minHeight: '270px', cursor:'Pointer'}} onClick={createNewInvoice}>
                <Plus size={48}/>
                <p className='mt-3 fw-medium'>Create New Invoices</p>
            </div>
          </div>

          {/* render the invoices */}
           {invoices.map((invoices,index)=>(
              <div className='col' key={index}>
            <div className='card h-100 shadow-sm coursor-pointer' style={{minHeight: '270px', cursor:'Pointer'}} onClick={()=>handleViewOnClick(invoices)}>
                {invoices.thumbnailUrl && (
                  <img src={invoices.thumbnailUrl} alt='invoice thumbnail'className='card-img-top' style={{height:'200px', objectFit:'cover'}}/>
                )}
                <div className='card-body'>
                  <h6 className='card-title mb-1'>{invoices.title}</h6>
                  <small className='text-muted'>
                    Last Updated:{invoices.lastUpdatedAt ? formatDate(invoices.lastUpdatedAt) : "N/A"}
                  </small>
                </div>
            </div>        
          </div>
          ))}
         
      </div>
    </div>
  )
}

export default DashBoard
