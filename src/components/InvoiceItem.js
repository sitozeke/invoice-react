import classes from './InvoiceItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function InvoiceItem({ invoice }) {
  console.log(invoice);
  const submit = useSubmit();
  function startDeleteHandler() {
    
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }
  return (
    <div>
      {invoice.map((invoice) => (
        <div key={invoice.id} className={classes.invoice}>
          <p className={classes.companyName}>Company Name: {invoice.companyName}</p>
          <p className={classes.address}>Address: {invoice.address}</p>
          <p className={classes.address}>Start Date: {invoice.startDate}</p>
          <div className={classes.itemContainer}>
            {invoice.items.map((item, index) => (
              <div key={index} className={classes.item}>
                <p>Plan Name: {item.planName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: {item.unitPrice}</p>
                <p>Total: {item.total}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </div>
  );
}

export default InvoiceItem;