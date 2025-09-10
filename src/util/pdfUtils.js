import html2canvas from "html2canvas"
import jsPDF from 'jspdf'


export const generatePdfFormatElement = async (element,fileName="invoice.pdf",returnBlob=false)=>{

   const canvas =  await html2canvas(element,{
        scale:2,
        useCORS:true,
        backgroundColor:"#fff",
        scrollY: -window.scrollY
    })

    const imagaeData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF("p","pt","a4");
    const imageProps = pdf.getImageProperties(imagaeData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imageProps.height * pdfWidth)/imageProps.width;
    pdf.addImage(imagaeData,"JPEG",0,0,pdfWidth,pdfHeight);

    if(returnBlob){
        return pdf.output("blob");

    }else{
        pdf.save(fileName);
    }


}