const API = "https://amtec-technologies-backend-production.up.railway.app/api/services";

const container = document.getElementById("servicesContainer");

async function loadServices(){

    const res = await fetch(API);

    const services = await res.json();

    container.innerHTML = "";

    services.forEach(service=>{

container.innerHTML += `

<div class="service-card">

    <div class="service-img-box">

        <img
            src="${
                service.image
                ?  + service.image
                : "assets/images/default-service.jpg"
            }"
            class="service-image"
            alt="${service.service_name}">

    </div>

    <div class="service-content">

        <h3>${service.service_name}</h3>

        <p>${service.short_description || ""}</p>

        <a
            href="service-details.html?id=${service.id}"
            class="service-btn">

            View Service

        </a>

    </div>

</div>

`;

    });

}

loadServices();