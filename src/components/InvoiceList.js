import { Link } from "react-router-dom";
import classes from "./InvoiceList.module.css";

function InvoicesList({ invoices }) {
  const allInvoices = [];
  
  Object.entries(invoices).forEach(([key, value]) => {
    let index = {
      id: key,
      companyName: value[0].companyName,
      items: value[0].items,
    };

    allInvoices.push(index);
  

  });

  return (
    <div className={classes.main}>
      <h1>All Invoices</h1>
      <ul className={classes.list}>
        {allInvoices.map((invoice) => (
          <li key={invoice.id} className={classes.item}>
            <Link to={invoice.id} className={classes.Linklist}>
              <div> {invoice.companyName} </div>

              <div>
                Total:
                {invoice.items.reduce((acc, item) => acc + item.total, 0)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoicesList;
