import { useNavigate, Form, json, redirect } from "react-router-dom";
import classes from "./InvoiceEditForm.module.css";

function InvoiceForm({ method, invoice, localDateStr }) {
  
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  function addItemHandler() {
    const plansDiv = document.querySelector("#plans");
    const newPlanDiv = document.createElement("div");
    newPlanDiv.innerHTML = `
      <p>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="Quantity"
          type="text"
          name="Quantity"
          required
        />
      </p>
      <p>
        <label htmlFor="quantity">Name of Plan</label>
        <input
          id="planName"
          type="text"
          name="planName"
          required
        />
      </p>
      <p>
        <label htmlFor="quantity">Unit Price</label>
        <input
          id="unitPrice"
          type="text"
          name="unitPrice"
          required
        />
      </p>
      <p>
        <label htmlFor="quantity">Total</label>
        <input
          id="Total"
          type="text"
          name="Total"
          required
        />
      </p>
      <button>Delete</button>`;
    plansDiv.appendChild(newPlanDiv);
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Name Of Company</label>
        <input
          id="companyName"
          type="text"
          name="companyName"
          required
          defaultValue={invoice ? invoice[0].companyName : ""}
        />
      </p>
      <p>
        <label htmlFor="address">Address of Company</label>
        <input
          id="address"
          type="text"
          name="address"
          required
          defaultValue={invoice ? invoice[0].address : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Start Date</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          required
          defaultValue={invoice ? localDateStr : ""}
        />
      </p>
      <div className={classes.plans} id="plans">
        {invoice ? (
          invoice[0].items.map((item) => (
            <div key={item.planName}>
              <p>
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="text"
                  name="quantity"
                  required
                  defaultValue={item.quantity}
                />
              </p>
              <p>
                <label htmlFor="planName">Name of Plan</label>
                <input
                  id="planName"
                  type="text"
                  name="planName"
                  required
                  defaultValue={item.planName}
                />
              </p>
              <p>
                <label htmlFor="quantity">Unit Price</label>
                <input
                  id="unitPrice"
                  type="text"
                  name="unitPrice"
                  required
                  defaultValue={item.unitPrice}
                />
              </p>
              <p>
                <label htmlFor="quantity">Total</label>
                <input
                  id="total"
                  type="text"
                  name="total"
                  required
                  defaultValue={item.total}
                />
              </p>
              <button>Delete</button>
            </div>
          ))
        ) : (
          <div key={""}>
            <p>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="text"
                name="quantity"
                required
                defaultValue={""}
              />
            </p>
            <p>
              <label htmlFor="planName">Name of Plan</label>
              <input
                id="planName"
                type="text"
                name="planName"
                required
                defaultValue={""}
              />
            </p>
            <p>
              <label htmlFor="unitPrice">Unit Price</label>
              <input
                id="unitPrice"
                type="text"
                name="unitPrice"
                required
                defaultValue={""}
              />
            </p>
            <p>
              <label htmlFor="total">Total</label>
              <input
                id="total"
                type="text"
                name="total"
                required
                defaultValue={""}
              />
            </p>
            <button>Delete</button>
          </div> // or null, or any other fallback value you want to use when invoice is falsy
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button onClick={addItemHandler}>Add Item</button>
        <button>Save Item</button>
      </div>
    </Form>
  );
}
export default InvoiceForm;

export async function action({ request, params }) {
  const method = request.method;

  const data = await request.formData();

  console.log(params.invoiceid);
  const invoice = [
    {
      address: data.get("address"),
      companyName: data.get("companyName"),
      items: [
        {
          planName: data.get("planName"),
          quantity: data.get("quantity"),
          unitPrice: data.get("unitPrice"),
          total: data.get("total"),
        },
      ],
      startDate: data.get("startDate"),
      id: params.invoiceid,
    },
  ];
   let url = "https://invoice-sla-default-rtdb.firebaseio.com/invoices.json"; 

  if (method === "PATCH") {
    const id = params.invoiceid;
    console.log(id);
    url = `https://invoice-sla-default-rtdb.firebaseio.com/invoices/${id}.json`;
  }
console.log(invoice);
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });
console.log(response);
  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/invoices");
}
