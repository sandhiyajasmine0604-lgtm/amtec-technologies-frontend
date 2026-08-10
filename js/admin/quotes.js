const API = "http://localhost:5000/api/quotes";

const tableBody = document.querySelector("#quoteTable tbody");

// Load Quote Requests
async function loadQuotes() {

    const res = await fetch(API);
    const quotes = await res.json();

    tableBody.innerHTML = "";

    quotes.forEach(quote => {

        tableBody.innerHTML += `

        <tr>

            <td>${quote.id}</td>

            <td>${quote.customer_name}</td>

            <td>${quote.company_name || "-"}</td>

            <td>${quote.product_name || "-"}</td>

            <td>${quote.phone}</td>

            <td>

                <span class="badge ${
                    quote.status === "Quote Sent"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }">

                    ${quote.status}

                </span>

            </td>

            <td>

                <button
                    class="btn btn-primary btn-sm"
                    onclick="viewQuote(${quote.id})">

                    View

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteQuote(${quote.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

loadQuotes();

// View Quote (Temporary)
let selectedQuoteId = null;

async function viewQuote(id){

    selectedQuoteId = id;

    const res = await fetch(API);
    const quotes = await res.json();

    const quote = quotes.find(q => q.id == id);

    if(!quote) return;

    document.getElementById("v_customer_name").innerText = quote.customer_name || "-";
    document.getElementById("v_company_name").innerText = quote.company_name || "-";
    document.getElementById("v_email").innerText = quote.email || "-";
    document.getElementById("v_phone").innerText = quote.phone || "-";
    document.getElementById("v_city").innerText = quote.city || "-";
    document.getElementById("v_product").innerText = quote.product_name || "-";
    document.getElementById("v_quantity").innerText = quote.quantity || "-";
    document.getElementById("v_message").innerText = quote.message || "-";

    if(quote.quotation_pdf){

        document.getElementById("currentQuotation").innerHTML = `
            <a href="http://localhost:5000/${quote.quotation_pdf}"
               target="_blank"
               class="btn btn-info">
               View Uploaded PDF
            </a>
        `;

    }else{

        document.getElementById("currentQuotation").innerHTML =
        "<span class='text-danger'>No quotation uploaded.</span>";

    }

    new bootstrap.Modal(
        document.getElementById("viewQuoteModal")
    ).show();

}
// Delete
async function deleteQuote(id){

    if(!confirm("Delete this quote request?")) return;

    const res = await fetch(API + "/" + id,{

        method:"DELETE"

    });

    const result = await res.json();

    alert(result.message);

    loadQuotes();

}
document.getElementById("uploadQuotation").onclick = async function(){

    console.log("Upload button clicked");

    if(selectedQuoteId == null){

        alert("Please open a quote first.");

        return;

    }

    const file = document.getElementById("quotation_pdf").files[0];

    if(!file){

        alert("Please choose a PDF.");

        return;

    }

    const formData = new FormData();

    formData.append("quotation_pdf", file);

    const res = await fetch(

        API + "/upload/" + selectedQuoteId,

        {

            method:"PUT",

            body:formData

        }

    );

    const result = await res.json();

    alert(result.message);

    loadQuotes();

    viewQuote(selectedQuoteId);

};
document.getElementById("sendWhatsapp").onclick = async function(){

    const res = await fetch(API);

    const quotes = await res.json();

    const quote =
    quotes.find(q => q.id == selectedQuoteId);

    if(!quote){

        alert("Quote not found");

        return;

    }

    if(!quote.quotation_pdf){

        alert("Upload quotation first.");

        return;

    }

    const pdfUrl =
    "http://localhost:5000/" + quote.quotation_pdf;

    const message =

`Hello ${quote.customer_name},

Thank you for contacting AMTEC Technologies.

Your quotation is ready.

${pdfUrl}

Regards,
AMTEC Technologies`;

    window.open(

        "https://wa.me/91" +
        quote.phone +
        "?text=" +
        encodeURIComponent(message),

        "_blank"

    );

};