const API = "https://amtec-technologies-backend-production.up.railway.app/api/services";

const form = document.getElementById("serviceForm");
const tableBody = document.querySelector("#serviceTable tbody");

let editMode = false;
let editingId = null;

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Load Services
async function loadServices() {

    const res = await fetch(API);
    const services = await res.json();

    tableBody.innerHTML = "";

    services.forEach(service => {

        tableBody.innerHTML += `

        <tr>

            <td>${service.id}</td>

            <td>${service.service_name}</td>
            <td>${service.short_description || "-"}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editService(${service.id})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteService(${service.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

loadServices();

// Save Service
// Save / Update Service
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = new FormData();

    data.append(
        "service_name",
        document.getElementById("service_name").value
    );

    data.append(
        "short_description",
        document.getElementById("short_description").value
    );

    data.append(
        "description",
        document.getElementById("description").value
    );

    if(document.getElementById("image").files.length > 0){

        data.append(
            "image",
            document.getElementById("image").files[0]
        );

    }

    let url = API;
    let method = "POST";

    if(editMode){

        url = API + "/" + editingId;
        method = "PUT";

    }

    const res = await fetch(url,{

        method,
        body:data

    });

    const result = await res.json();

    alert(result.message);

    form.reset();

    editMode = false;
    editingId = null;

    saveBtn.innerHTML =
    '<i class="fas fa-save"></i> Save Service';

    cancelBtn.style.display = "none";

    loadServices();

});
async function editService(id){

    const res = await fetch(API);

    const services = await res.json();

    const service =
    services.find(s=>s.id==id);

    if(!service) return;

    editingId = id;
    editMode = true;

    document.getElementById("service_name").value =
    service.service_name;

    document.getElementById("short_description").value =
    service.short_description;
      
    document.getElementById("description").value =
    service.description || "";

    saveBtn.innerHTML =
    '<i class="fas fa-save"></i> Update Service';
cancelBtn.style.display = "inline-block";
window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// Delete Service
async function deleteService(id){

    if(!confirm("Delete this service?")) return;

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadServices();

}

cancelBtn.addEventListener("click", () => {

    form.reset();

    editMode = false;
    editingId = null;

    saveBtn.innerHTML =
    '<i class="fas fa-save"></i> Save Service';

    cancelBtn.style.display = "none";

});