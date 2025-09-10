import {  createContext, useState } from "react";

export const AppContext = createContext();

export const initialInvoiceData = {
    title : "New Invoice",
    billing : {name:"",phone:"",address:""},
    shipping : {name:"",phone:"",address:""},
    invoice : {number:"",date:"",dueDate:""},
    account : {name:"",number:"",ifscCode:""},
    company : {name:"",phone:"",address:""},
    tax :0,
    notes : "",
    items :[
        {name:"",qty:"",amount:"",description:"",total:0},
    ],
    logo :""

};


export const AppContextProvider = ({children }) =>{

    const[invoiceTitle,setInvoiceTitle]= useState("New invoice");
    const [invoiceData,setInvoiceData] = useState(initialInvoiceData);

   const baseUrl = "http://localhost:8080/api"

const contextValue={
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    initialInvoiceData,
    baseUrl
}

    return(
        <AppContext.Provider value={contextValue}>

            {children }
        </AppContext.Provider>



    )
}