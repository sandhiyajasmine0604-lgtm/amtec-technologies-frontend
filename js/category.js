const API = "http://localhost:5000/api/categories";

const form = document.getElementById("categoryForm");
const tableBody = document.querySelector("#categoryTable tbody");

let editMode = false;
let editingId = null;

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Load Categories
async function loadCategories() {

    const res = await fetch(API);
    const categories = await res.json();

    tableBody.innerHTML = "";

    categories.forEach(category => {

        tableBody.innerHTML += `

        <tr>

            <td>${category.id}</td>

            <td>${category.category_name}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editCategory(${category.id})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteCategory(${category.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

loadCategories();

// Save Category
// Save / Update Category
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {
        category_name: document.getElementById("category_name").value
    };

    let url = API;
    let method = "POST";

    if(editMode){

        url = API + "/" + editingId;
        method = "PUT";

    }

    const res = await fetch(url,{

        method: method,

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(data)

    });

    const result = await res.json();

    alert(result.message);

    form.reset();

    editMode = false;
    editingId = null;

    saveBtn.innerHTML =
    '<i class="fas fa-save"></i> Save Category';

    cancelBtn.style.display = "none";

    loadCategories();

});
async function editCategory(id){

    const res = await fetch(API);

    const categories = await res.json();

    const category =
    categories.find(c=>c.id==id);

    if(!category) return;

    editingId = id;
    editMode = true;

    document.getElementById("category_name").value =
    category.category_name;

    saveBtn.innerHTML =
    '<i class="fas fa-save"></i> Update Category';
cancelBtn.style.display = "inline-block";
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
}

// Delete Category
async function deleteCategory(id){

    if(!confirm("Delete this category?")) return;

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadCategories();

}

cancelBtn.addEventListener("click", () => {

    form.reset();

    editMode = false;
    editingId = null;

    saveBtn.innerHTML =
    '<i class="fas fa-save"></i> Save Category';

    cancelBtn.style.display = "none";

});