const API = "https://amtec-technologies-backend-production.up.railway.app/api/products/categories/all";

let allProducts = [];

async function loadProducts() {

    const res = await fetch(API);

    allProducts = await res.json();

    createCategories();

    showProducts();

}

function createCategories() {

    const categoryList =
        document.getElementById("categoryList");

    const categories =
        [...new Set(allProducts.map(x => x.category_name))];

    categoryList.innerHTML = `

        <button
            class="list-group-item list-group-item-action active"
            onclick="showProducts()">

            All Products

        </button>

    `;

    categories.forEach(category => {

        categoryList.innerHTML += `

            <button
                class="list-group-item list-group-item-action"
                onclick="showProducts('${category}')">

                ${category}

            </button>

        `;

    });

}

function showProducts(category = "") {
      const products = category

        ? allProducts.filter(
            x => x.category_name === category
        )

        : allProducts;
   const title = document.getElementById("currentCategory");
const subtitle = document.getElementById("categoryDescription");

if (category === "") {
    title.innerHTML = "All Products";
    subtitle.innerHTML = "Showing all available products";
} else {
    title.innerHTML = category;
    subtitle.innerHTML = `Showing ${products.length} products`;
}

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

  

    products.forEach(product => {

        container.innerHTML += `

            <div class="col-md-4 mb-4">

                <div class="card product-card h-100">

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

                        <h5>

                            ${product.product_name}

                        </h5>

                        <p>

                            ${product.short_description || ""}

                        </p>

                        <a
                            href="product-details.html?id=${product.id}"
                            class="btn btn-primary btn-sm">

                            View Details

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}

loadProducts();