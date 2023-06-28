import { useRouteLoaderData, json, redirect } from 'react-router-dom';
import InvoiceItem from '../components/InvoiceItem';

function InvoiceDetailPage() {
  const invoice = useRouteLoaderData('invoice-detail');
 console.log(invoice)
  return (
    <>
      <InvoiceItem invoice={invoice} />
    </>
  );
}

export default InvoiceDetailPage;

export async function loader({request, params}) {
  const id = params.invoiceid;
  console.log(id);
  const response = await fetch(`https://invoice-sla-default-rtdb.firebaseio.com/invoices/${id}.json`);
  if (!response.ok) {
    throw json({message: 'Could not fetch details for selected event.'}, {
      status: 500
    })
  } else {
    return response.json();
  }
}


export async function action({ params, request }) {
  const id = params.invoiceid;
  console.log(id);
  const response = await fetch(`https://invoice-sla-default-rtdb.firebaseio.com/invoices/${id}.json`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/invoices');
}
