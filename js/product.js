const API = "https://amtec-technologies-backend-production.up.railway.app/api/products";
function getFileUrl(file) {

    if (!file) {
        return "";
    }

    if (file.startsWith("http://") || file.startsWith("https://")) {
        return file.replace("http://", "https://");
    }

    return  +
        file.replace(/\\/g, "/");
}
const categoryDropdown = document.getElementById("category_id");
const form = document.getElementById("productForm");
let editMode = false;
let editingId = null;

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
// Load Categories
async function loadCategories() {

    const res = await fetch("https://amtec-technologies-backend-production.up.railway.app/api/categories");
    const data = await res.json();

    categoryDropdown.innerHTML = '<option value="">Select Category</option>';

    data.forEach(category => {

        categoryDropdown.innerHTML += `
            <option value="${category.id}">
                ${category.category_name}
            </option>
        `;

    });

}

loadCategories();
loadProducts();

// Save Product
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData();

    formData.append("product_name", document.getElementById("product_name").value);
    formData.append("model_number", document.getElementById("model_number").value);
    formData.append("brand", document.getElementById("brand").value);
    formData.append("category_id", document.getElementById("category_id").value);

    formData.append(
    "short_description",
    document.getElementById("short_description").value
);

formData.append(
    "description",
    document.getElementById("description").value
);

formData.append(
    "specifications",
    document.getElementById("specifications").value
);

formData.append(
    "features",
    document.getElementById("features").value
);
    formData.append("status", document.getElementById("status").value);

    const imageFile = document.getElementById("image").files[0];
const datasheetFile = document.getElementById("datasheet").files[0];

if (imageFile) {
    formData.append("image", imageFile);
}

if (datasheetFile) {
    formData.append("datasheet", datasheetFile);
}

    let url = API;
let method = "POST";

if (editMode) {

    url = API + "/" + editingId;
    method = "PUT";

}

const res = await fetch(url, {

    method: method,

    body: formData

});

    const result = await res.json();

console.log("STATUS:", res.status);
console.log("RESPONSE:", result);

if (!res.ok) {
    alert(
        result.message ||
        result.error ||
        "Product upload failed. Check console."
    );
    return;
}

    alert(result.message);

    form.reset();
    loadProducts();
    
});


async function editProduct(id){

    const res = await fetch(API);

    const products = await res.json();

    const product = products.find(p => p.id == id);

    if(!product) return;

    editingId = id;
    editMode = true;

    document.getElementById("product_id").value = id;

    document.getElementById("product_name").value = product.product_name || "";
    document.getElementById("model_number").value = product.model_number || "";
    document.getElementById("brand").value = product.brand || "";
    document.getElementById("category_id").value = product.category_id || "";

    document.getElementById("status").value = product.status || "Active";

    document.getElementById("short_description").value = product.short_description || "";
    document.getElementById("description").value = product.description || "";
    document.getElementById("specifications").value = product.specifications || "";
    document.getElementById("features").value = product.features || "";

     const previewImage = document.getElementById("previewImage");

    if(product.image){
        
        previewImage.src = getFileUrl(product.image);

        previewImage.style.display = "block";

    }

    if(product.datasheet){
        const pdfName = document.getElementById("pdfName");
        pdfName.innerHTML =
            `<a href="${getFileUrl(product.datasheet)}" target="_blank">
                View Current PDF
            </a>`;

    }

    saveBtn.innerHTML =
        '<i class="fas fa-save"></i> Update Product';
        cancelBtn.style.display = "inline-block";
        console.log(window.scrollY);

window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
});

}

// Image Preview

document
.getElementById("image")
.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            const img =
            document.getElementById("previewImage");

            img.src = e.target.result;

            img.style.display = "block";

        }

        reader.readAsDataURL(file);

    }

});

// PDF Name

document
.getElementById("datasheet")
.addEventListener("change", function(){

    if(this.files.length){

        document
        .getElementById("pdfName")
        .innerText = this.files[0].name;

    }

});
const tableBody = document.querySelector("#productTable tbody");

async function loadProducts() {

    const res = await fetch(API);

    const products = await res.json();

    tableBody.innerHTML = "";

    products.forEach(product => {

        tableBody.innerHTML += `
c

            <td>
                <b>${product.product_name}</b><br>
                <small>${product.model_number || ""}</small>
            </td>

            <td>${product.brand || "-"}</td>

            <td>${product.category_name || "-"}</td>

        

            <td>

                <span class="badge ${product.status=="Active"?"bg-success":"bg-secondary"}">

                    ${product.status}

                </span>

            </td>

            <td>

                ${
                    product.datasheet
                    ?

                    `<a href="${getFileUrl(product.datasheet)}" target="_blank">
                        PDF

                    </a>`

                    :

                    "-"

                }

            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editProduct(${product.id})">

                    Edit

                </button>

                <button
    class="btn btn-danger btn-sm"
    onclick="deleteProduct(${product.id})">
    Delete
</button>

            </td>

        </tr>

        `;

    });

}
cancelBtn.addEventListener("click", function () {

    form.reset();

    editMode = false;
    editingId = null;

    saveBtn.innerHTML =
        '<i class="fas fa-save"></i> Save Product';

    cancelBtn.style.display = "none";

    document.getElementById("product_id").value = "";

    document.getElementById("previewImage").style.display = "none";

    document.getElementById("pdfName").innerHTML = "";

});
async function deleteProduct(id){

    if(!confirm("Are you sure you want to delete this product?")){
        return;
    }

    const res = await fetch(API + "/" + id, {
        method: "DELETE"
    });

    const result = await res.json();

console.log(result);

alert(result.message);
    loadProducts();

}