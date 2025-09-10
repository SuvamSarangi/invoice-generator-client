import axios from "axios"

export const saveInvoice = async (baseUrl,payload)=>{

   return await axios.post(`${baseUrl}/invoice/save`,payload)
}


export const getAllInvoices = async (baseUrl)=>{

   return await axios.get(`${baseUrl}/invoice`)
}

export const deleteInvoice = async (baseUrl,id) =>{
   return await axios.delete(`${baseUrl}/invoice/${id}`);
}

export const sendInvoice = async (baseUrl,formData) =>{
   return await axios.post(`${baseUrl}/invoice/sendinvoice`,formData);
}