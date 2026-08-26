const API = "https://amtec-technologies-backend-production.up.railway.app/api/quotes";

const quoteModal = new bootstrap.Modal(
    document.getElementById("quoteModal")
);

// Open Quote Popup
function openQuoteModal(subject){

    document.getElementById("quoteSubject").value = subject;

    document.getElementById("quoteForm").reset();

    document.getElementById("quoteSubject").value = subject;

    quoteModal.show();

}

// Submit Quote Request
document.getElementById("quoteForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        customer_name:
        document.getElementById("customerName").value,

        company_name:
        document.getElementById("companyName").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value,

        city:
        document.getElementById("city").value,

        subject:
        document.getElementById("quoteSubject").value,

        message:
        document.getElementById("message").value

    };

    const res = await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    const result = await res.json();

    alert(result.message);

    quoteModal.hide();

});