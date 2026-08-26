const API = "https://amtec-technologies-backend-production.up.railway.app/api/products";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {

    const res = await fetch(`${API}/${id}`);
    const product = await res.json();

    const image = product.image
        ? "https://amtec-technologies-backend-production.up.railway.app/" + product.image.replace(/\\/g, "/")
        : "assets/images/no-image.png";
document.getElementById("breadcrumbCategory").innerText =
    product.category_name;

document.getElementById("breadcrumbProduct").innerText =
    product.product_name;
    // Load related products
loadRelatedProducts(product.id);
   document.getElementById("productDetails").innerHTML = `

<div class="col-lg-5">

    <div class="product-gallery">

        <img
            src="${product.image ? "https://amtec-technologies-backend-production.up.railway.app/" + product.image.replace(/\\/g,"/") : "assets/images/no-image.png"}"
            class="img-fluid rounded shadow">

    </div>

</div>

<div class="col-lg-7 product-info">

    <span class="badge bg-primary mb-3">
        ${product.category_name}
    </span>

    <h1 class="mb-3">
        ${product.product_name}
    </h1>

    <h5 class="text-muted mb-3">
        Model : ${product.model_number}
    </h5>

    <p class="brand mb-4">
        ${product.brand}
    </p>

    <p class="lead">
        ${product.short_description}
    </p>

    <ul class="product-highlights">

        <li><i class="fa fa-check"></i> Genuine Product</li>

        <li><i class="fa fa-check"></i> Installation Support</li>

        <li><i class="fa fa-check"></i> Warranty Available</li>

        <li><i class="fa fa-check"></i> PAN India Delivery</li>

    </ul>

    <div class="mt-4">

        <a
            class="btn btn-warning px-4 me-3"
            href="#">

            <i class="fa fa-comment-dots"></i>
            Request Quote

        </a>

        <a
            class="btn btn-outline-primary px-4"
            href="https://amtec-technologies-backend-production.up.railway.app/${product.datasheet?.replace(/\\/g,"/")}"
            target="_blank">

            <i class="fa fa-file-pdf"></i>
            Datasheet

        </a>

    </div>

</div>

<div class="col-12 mt-5">

    <h3>Description</h3>

    <p>${product.description}</p>

</div>

<div class="col-12 mt-4">

    <h3>Specifications</h3>

    <table class="table table-bordered">

        <tr>
            <th>Category</th>
            <td>${product.category_name}</td>
        </tr>

        <tr>
            <th>Brand</th>
            <td>${product.brand}</td>
        </tr>

        <tr>
            <th>Model</th>
            <td>${product.model_number}</td>
        </tr>

        <tr>
            <th>Specifications</th>
            <td>${product.specifications}</td>
        </tr>

    </table>

</div>

<div class="col-12 mt-4">

    <h3>Features</h3>

    <ul>

        ${product.features
            .split(",")
            .map(f => `<li>${f.trim()}</li>`)
            .join("")}

    </ul>

</div>

`;
}

loadProduct();
async function loadRelatedProducts(id) {

    const res = await fetch(
        `https://amtec-technologies-backend-production.up.railway.app/api/products/related/${id}`
    );

    const products = await res.json();

    const container =
        document.getElementById("relatedProducts");

    container.innerHTML = "";

    if(products.length === 0){

        container.innerHTML = `
            <div class="col-12">
                <p class="text-muted">
                    No related products found.
                </p>
            </div>
        `;

        return;
    }

    products.forEach(product => {

        container.innerHTML += `

        <div class="col-lg-3 col-md-6">

            <div class="card product-card h-100">

                <img
                    src="${
                        product.image
                        ? "https://amtec-technologies-backend-production.up.railway.app/" + product.image.replace(/\\/g,"/")
                        : "assets/images/no-image.png"
                    }"
                    class="card-img-top">

                <div class="card-body">

                    <small class="text-primary">
                        ${product.brand}
                    </small>

                    <h6 class="mt-2">
                        ${product.product_name}
                    </h6>

                    <a
                        href="product-details.html?id=${product.id}"
                        class="btn btn-warning btn-sm mt-3">

                        View Details

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}