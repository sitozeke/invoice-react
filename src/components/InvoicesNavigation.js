import classes from "./InvoicesNavigation.module.css";
import { NavLink } from "react-router-dom";

function InvoiceNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Invoice
            </NavLink>
          </li>
          <li>
            <NavLink to="/invoices/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>New Invoice</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default InvoiceNavigation;
