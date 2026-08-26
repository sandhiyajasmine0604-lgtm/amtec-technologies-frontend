const API = "https://amtec-technologies-backend-production.up.railway.app/api/services";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadService() {

    const res = await fetch(API + "/" + id);

const service = await res.json();
    if (!service) {

        document.getElementById("serviceTitle").innerHTML = "Service Not Found";

        return;

    }

    document.getElementById("serviceName").innerHTML =
service.service_name;
document.getElementById("serviceTitle").innerHTML =
service.service_name;

document.getElementById("breadcrumbTitle").innerHTML =
service.service_name;

document.getElementById("serviceShort").innerHTML =
service.short_description;

document.getElementById("serviceDescription").innerHTML = `
<p>${service.description}</p>
`;

document.getElementById("serviceImage").src =
service.image
? "https://amtec-technologies-backend-production.up.railway.app/" + service.image
: "assets/images/default-service.jpg";

document.getElementById("quoteBtn").onclick = function () {

    openQuoteModal(service.service_name);

};

}

loadService();
