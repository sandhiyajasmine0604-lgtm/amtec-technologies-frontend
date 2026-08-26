const PRODUCT_API = "https://amtec-technologies-backend-production.up.railway.app/api/products";
const CATEGORY_API = "https://amtec-technologies-backend-production.up.railway.app/api/categories";
const currentPage="dashboard";
async function loadDashboard() {

    try {

        const productElement = document.getElementById("productCount");
        const categoryElement = document.getElementById("categoryCount");

        if (productElement) {
            const productRes = await fetch("https://amtec-technologies-backend-production.up.railway.app/api/products");
            const products = await productRes.json();
            productElement.innerText = products.length;
        }

        if (categoryElement) {
            const categoryRes = await fetch("https://amtec-technologies-backend-production.up.railway.app/api/categories");
            const categories = await categoryRes.json();
            categoryElement.innerText = categories.length;
        }

    } catch (err) {
        console.log(err);
    }

}

loadDashboard();

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });

}
const API = "https://amtec-technologies-backend-production.up.railway.app/api/products";

async function loadDashboard(){

    const res = await fetch(API);

    const products = await res.json();

    // Total Products
    document.getElementById("productCount").innerText = products.length;
    const catRes = await fetch(CATEGORY_API);

const categories = await catRes.json();

document.getElementById("categoryCount").innerText = categories.length;

    // Latest 5 Products
    const tbody = document.querySelector("#latestProductsTable tbody");

    tbody.innerHTML = "";

    products
        .slice(-5)
        .reverse()
        .forEach(product=>{

        tbody.innerHTML += `

        <tr>

            <td>

                <img
                src="https://amtec-technologies-backend-production.up.railway.app/${product.image}"
                width="55"
                style="border-radius:10px;">

            </td>

            <td>

                <strong>${product.product_name}</strong>

            </td>

            <td>

                <span class="badge ${product.status=="Active"?"bg-success":"bg-secondary"}">

                    ${product.status}

                </span>

            </td>

            <td>

                ₹ ${product.price}

            </td>

        </tr>

        `;

    });

}

loadDashboard();
document.getElementById("todayDate").innerHTML =
new Date().toLocaleDateString("en-IN",{

    weekday:"long",

    day:"numeric",

    month:"long",

    year:"numeric"

});