const API = "https://amtec-technologies-backend-production.up.railway.app/api/products";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// ==========================================
// FILE URL HELPER
// ==========================================

function getFileUrl(file) {

    if (!file) {
        return "assets/images/no-image.png";
    }

    // Cloudinary URL
    if (file.startsWith("http://") || file.startsWith("https://")) {
        return file.replace("http://", "https://");
    }

    // Old Railway/local upload
    return  +
        file.replace(/\\/g, "/");
}


// ==========================================
// LOAD PRODUCT
// ==========================================

async function loadProduct() {

    try {

        const res = await fetch(`${API}/${id}`);

        if (!res.ok) {
            throw new Error("Product not found");
        }

        const product = await res.json();

        console.log("PRODUCT:", product);

        const imageUrl = getFileUrl(product.image);
        const datasheetUrl = product.datasheet
            ? getFileUrl(product.datasheet)
            : null;


        // ==========================================
        // BREADCRUMB
        // ==========================================

        document.getElementById("breadcrumbCategory").innerText =
            product.category_name || "";

        document.getElementById("breadcrumbProduct").innerText =
            product.product_name || "";


        // ==========================================
        // RELATED PRODUCTS
        // ==========================================

        loadRelatedProducts(product.id);


        // ==========================================
        // PRODUCT DETAILS
        // ==========================================

        document.getElementById("productDetails").innerHTML = `

            <div class="col-lg-5">

                <div class="product-gallery">

                    <img
                        src="${imageUrl}"
                        class="img-fluid rounded shadow"
                        alt="${product.product_name || "Product"}"
                        onerror="this.src='assets/images/no-image.png'"
                    >

                </div>

            </div>


            <div class="col-lg-7 product-info">

                <span class="badge bg-primary mb-3">
                    ${product.category_name || ""}
                </span>


                <h1 class="mb-3">
                    ${product.product_name || ""}
                </h1>


                <h5 class="text-muted mb-3">
                    Model : ${product.model_number || "-"}
                </h5>


                <p class="brand mb-4">
                    ${product.brand || ""}
                </p>


                <p class="lead">
                    ${product.short_description || ""}
                </p>


                <ul class="product-highlights">

                    <li>
                        <i class="fa fa-check"></i>
                        Genuine Product
                    </li>

                    <li>
                        <i class="fa fa-check"></i>
                        Installation Support
                    </li>

                    <li>
                        <i class="fa fa-check"></i>
                        Warranty Available
                    </li>

                    <li>
                        <i class="fa fa-check"></i>
                        PAN India Delivery
                    </li>

                </ul>


                <div class="mt-4">

                    <a
                        class="btn btn-warning px-4 me-3"
                        href="#">
                        <i class="fa fa-comment-dots"></i>
                        Request Quote
                    </a>


                    ${
                        datasheetUrl
                        ?

                        `<a
                            class="btn btn-outline-primary px-4"
                            href="${datasheetUrl}"
                            target="_blank">

                            <i class="fa fa-file-pdf"></i>
                            Datasheet

                        </a>`

                        :

                        ""
                    }

                </div>

            </div>


            <!-- DESCRIPTION -->

            <div class="col-12 mt-5">

                <h3>Description</h3>

                <p>
                    ${product.description || ""}
                </p>

            </div>


            <!-- SPECIFICATIONS -->

            <div class="col-12 mt-4">

                <h3>Specifications</h3>

                <table class="table table-bordered">

                    <tr>
                        <th>Category</th>
                        <td>${product.category_name || "-"}</td>
                    </tr>

                    <tr>
                        <th>Brand</th>
                        <td>${product.brand || "-"}</td>
                    </tr>

                    <tr>
                        <th>Model</th>
                        <td>${product.model_number || "-"}</td>
                    </tr>

                    <tr>
                        <th>Specifications</th>
                        <td>${product.specifications || "-"}</td>
                    </tr>

                </table>

            </div>


            <!-- FEATURES -->

            <div class="col-12 mt-4">

                <h3>Features</h3>

                <ul>

                    ${
                        product.features
                        ? product.features
                            .split(",")
                            .map(f => `<li>${f.trim()}</li>`)
                            .join("")
                        : "<li>No features available</li>"
                    }

                </ul>

            </div>

        `;

    } catch (error) {

        console.error("Error loading product:", error);

        document.getElementById("productDetails").innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    Unable to load product.

                </div>

            </div>

        `;

    }

}


loadProduct();


// ==========================================
// RELATED PRODUCTS
// ==========================================

async function loadRelatedProducts(id) {

    try {

        const res = await fetch(
            `${API}/related/${id}`
        );

        const products = await res.json();

        const container =
            document.getElementById("relatedProducts");

        container.innerHTML = "";


        if (products.length === 0) {

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

            const imageUrl = getFileUrl(product.image);


            container.innerHTML += `

                <div class="col-lg-3 col-md-6">

                    <div class="card product-card h-100">

                        <img
                            src="${imageUrl}"
                            class="card-img-top"
                            alt="${product.product_name || "Product"}"
                            onerror="this.src='assets/images/no-image.png'"
                        >


                        <div class="card-body">

                            <small class="text-primary">
                                ${product.brand || ""}
                            </small>


                            <h6 class="mt-2">
                                ${product.product_name || ""}
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

    } catch (error) {

        console.error(
            "Error loading related products:",
            error
        );

    }

}