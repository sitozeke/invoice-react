import { useLoaderData, json } from "react-router-dom";
import InvoicesList from "../components/InvoiceList";

function AllInvoice() {
  const invoices = useLoaderData();
  // console.log(invoices);
  return (
    <>
      <InvoicesList invoices={invoices} />
    </>
  );
}

export default AllInvoice;

export async function loader() {
  const response = await fetch(
    "https://invoice-sla-default-rtdb.firebaseio.com/invoices.json"
  );

  if (!response.ok) {
      
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });

    throw json (
      { message: 'Could not fetch events.' }, {
          status: 500,
        });
    

  }else {
    
    const resData = await response.json();
    
    return resData;
  }
}
