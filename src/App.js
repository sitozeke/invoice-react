import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import InvoiceDetailPage, {
  loader as invoiceDetailLoader, action as deleteInvoiceAction,
} from './pages/InvoiceDetail';
import AllInvoice, { loader as invoicesLoader } from "./pages/all-invoice";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import NewInvoicePage from "./pages/NewInvoice";
import EditInvoice from "./pages/EditInvoice";
import InvoicesRoot from "./pages/InvoicesRoot";
import { action as manipulateInvoiceAction } from './components/InvoiceEditForm';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <HomePage /> },
      {
        path: "invoices",
        element: <InvoicesRoot />,
        children: [
          {
            index: 'true',
            element: <AllInvoice  />,
            loader:  invoicesLoader,
          },
          {
            path:':invoiceid',
            id:'invoice-detail',
            loader: invoiceDetailLoader,
            children:[
              {
              index: true,
              element:<InvoiceDetailPage />,
              action: deleteInvoiceAction,
            },
            { path: "edit", 
            element: <EditInvoice />,
            action: manipulateInvoiceAction,  },

            ],
          },
          
          { path: "new", element: <NewInvoicePage />,  action: manipulateInvoiceAction, },
          
        ],
      },
    ],
  },
]);

async function addInvoiceHandler(invoice){
  const response = await fetch('https://invoice-sla-default-rtdb.firebaseio.com/invoices.json',{
  method: 'POST',
  body: JSON.stringify(invoice),
  headers:{
    'Content-Type': 'application/json'
  }
} );
const data = await response.json();

}
const dummyInvoices = [
  {
  
    companyName: "John Doe",
    address: 'Lagos',
    startDate: '2022-08-20',
    items: [
      {
        planName: "Red beryl",
        quantity: 5,
        unitPrice: 100,
        get total(){
          return this.quantity * this.unitPrice 
        }
      },
      {
        planName: "alexandrite",
        quantity: 3,
        unitPrice: 100,
        get total () {
          return this.quantity * this.unitPrice 
        }
      }
    ]
  }
];


  addInvoiceHandler(dummyInvoices);
 
function App() {
  return <RouterProvider router={router} />;
}

export default App;
