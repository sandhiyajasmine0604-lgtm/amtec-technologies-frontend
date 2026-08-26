console.log("Quote JS Loaded");
const QUOTE_API = "https://amtec-technologies-backend-production.up.railway.app/api/quotes";

document.getElementById("quoteForm").addEventListener("submit", async function(e){

    e.preventDefault();
    console.log("Form Submitted");

    const data = {

        customer_name: document.getElementById("customer_name").value,
        company_name: document.getElementById("company_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        product_name: document.getElementById("product_name").value,
        quantity: document.getElementById("quantity").value,
        message: document.getElementById("message").value

    };

    const res = await fetch(QUOTE_API, {

        method: "POST",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify(data)

    });

    const result = await res.json();

    if(res.ok){

        alert("Thank you! Your request has been submitted.");

        document.getElementById("quoteForm").reset();

        bootstrap.Modal
            .getInstance(document.getElementById("quoteModal"))
            .hide();

    }else{

        alert(result.message);

    }

});
let selectedQuoteId = null;

// Save selected quote id
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
            <a href="https://amtec-technologies-backend-production.up.railway.app/${quote.quotation_pdf}"
               target="_blank"
               class="btn btn-info btn-sm">
               View Uploaded Quotation
            </a>
        `;

    }else{

        document.getElementById("currentQuotation").innerHTML =
        "<span class='text-danger'>No quotation uploaded.</span>";

    }

    const modal = new bootstrap.Modal(
        document.getElementById("viewQuoteModal")
    );

    modal.show();

}
document.getElementById("uploadQuotation").addEventListener("click", async () => {
console.log("Upload button clicked");
    if(!selectedQuoteId){

        alert("Please open a quotation first.");

        return;

    }

    const fileInput =
        document.getElementById("quotation_pdf");

    if(fileInput.files.length === 0){

        alert("Please choose a PDF.");

        return;

    }

    const formData = new FormData();

    formData.append(
        "quotation_pdf",
        fileInput.files[0]
    );

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

});