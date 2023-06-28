import { Outlet } from "react-router-dom";
 import InvoiceNavigation from "../components/InvoicesNavigation";
function InvoicesRoot() {
    return <>
       <InvoiceNavigation/>
       <main>
        <Outlet />
        </main>
    </>
}

export default InvoicesRoot;