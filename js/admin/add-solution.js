const form = document.getElementById("solutionForm");
const table = document.getElementById("solutionsTable");
console.log("Solution JS Loaded");
let editingId = null;
// Load Solutions
async function loadSolutions() {

    const res = await fetch("https://amtec-technologies-backend-production.up.railway.app/api/solutions");

    const solutions = await res.json();

    table.innerHTML = "";

    solutions.forEach(solution => {

        table.innerHTML += `

        <tr>

            <td>
                <img
                    src="https://amtec-technologies-backend-production.up.railway.app/${solution.image}"
                    width="70">
            </td>

            <td>${solution.title}</td>

            <td>${solution.short_description}</td>

            <td>${solution.status}</td>

            <td class="text-center">

    <button class="btn btn-sm btn-warning rounded-pill px-3"
        onclick="editSolution(${solution.id})">

           <i class="fa fa-pen"></i> Edit

    </button>

    <button
        class="btn btn-sm btn-danger rounded-pill px-3"
        onclick="deleteSolution(${solution.id})">

          <i class="fa fa-trash"></i> Delete

    </button>

</td>

        </tr>

        `;

    });

}

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = new FormData();

    data.append("title",
        document.getElementById("title").value);

    data.append("short_description",
        document.getElementById("short_description").value);

    data.append("description",
        document.getElementById("description").value);

    if (document.getElementById("image").files.length > 0) {

        data.append(
            "image",
            document.getElementById("image").files[0]
        );

    }

    let url = "https://amtec-technologies-backend-production.up.railway.app/api/solutions";
    let method = "POST";

    if (editingId) {

        url += "/" + editingId;
        method = "PUT";

    }

    const res = await fetch(url, {

        method,
        body: data

    });

    const result = await res.json();

    alert(result.message);

    form.reset();

    editingId = null;

   document.getElementById("saveBtn").innerHTML =
    "Save Solution";

document.getElementById("cancelBtn").style.display =
    "none";

    loadSolutions();

});

loadSolutions();
async function deleteSolution(id) {

    if (!confirm("Delete this solution?"))
        return;

    const res = await fetch(

        `https://amtec-technologies-backend-production.up.railway.app/api/solutions/${id}`,

        {
            method: "DELETE"
        }

    );

    const result = await res.json();

    alert(result.message);

    loadSolutions();

}
async function editSolution(id) {

    const res = await fetch(
        `https://amtec-technologies-backend-production.up.railway.app/api/solutions/${id}`
    );

    const solution = await res.json();

    document.getElementById("title").value =
        solution.title;

    document.getElementById("short_description").value =
        solution.short_description;

    document.getElementById("description").value =
        solution.description;

    editingId = solution.id;

    document.getElementById("saveBtn").innerHTML =
    "Update Solution";

document.getElementById("cancelBtn").style.display =
    "inline-block";

    form.scrollIntoView({
    behavior:"smooth"
});

}
const cancelBtn = document.getElementById("cancelBtn");

if (cancelBtn) {

    cancelBtn.addEventListener("click", () => {

        editingId = null;

        form.reset();

        document.getElementById("saveBtn").innerHTML =
            "Save Solution";

        cancelBtn.style.display = "none";

    });

}