 import { useRouteLoaderData } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceEditForm';

function  EditInvoice() {
    const invoice = useRouteLoaderData( 'invoice-detail' );
    const utcDateStr = invoice[0].startDate;
    const utcDate = new Date(utcDateStr);
    const localDateStr = utcDate.toISOString().substr(0, 10);
    
    return  <InvoiceForm method ='patch' invoice ={invoice} localDateStr= {localDateStr}/>;
 
}
export default EditInvoice;