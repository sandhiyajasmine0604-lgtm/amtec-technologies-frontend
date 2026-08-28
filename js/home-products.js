const API = "https://amtec-technologies-backend-production.up.railway.app/api/products";

async function loadHomeProducts() {

    const res = await fetch(API);

    const products = await res.json();

    const container = document.getElementById("homeProducts");

    container.innerHTML = "";

    products.slice(0,8).forEach(product => {

        container.innerHTML += `

        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

            <div class="card h-100 shadow-sm">

                <img
                    src="${
                        product.image
                        ?  product.image
                        : "assets/images/no-image.png"
                    }"
                    class="card-img-top"
                    style="
                        height:220px;
                        object-fit:contain;
                        padding:15px;
                    ">

                <div class="card-body">

                    <small class="text-primary">

                        ${product.brand || ""}

                    </small>

                    <h5 class="mt-2">

                        ${product.product_name}

                    </h5>

                    <p>

                        ${product.short_description || ""}

                    </p>

                </div>

                <div class="card-footer bg-white border-0">

                    <a href="product-details.html?id=${product.id}"

                       class="btn btn-warning w-100">

                        View Details

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

loadHomeProducts();