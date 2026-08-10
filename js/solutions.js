const API = "http://localhost:5000/api/solutions";

const container = document.getElementById("solutionsContainer");

async function loadSolutions(){

    const res = await fetch(API);

    const solutions = await res.json();

    container.innerHTML = "";

    solutions.forEach(solution => {

        container.innerHTML += `

        <div class="solution-card">

            <div class="solution-icon">

                <i class="fas fa-shield-alt"></i>

            </div>

            <h3>${solution.solution_name}</h3>

            <p>${solution.short_description || ""}</p>

            <ul class="solution-features">

                <li><i class="fas fa-check-circle"></i> Professional Installation</li>

                <li><i class="fas fa-check-circle"></i> Annual Maintenance</li>

                <li><i class="fas fa-check-circle"></i> Technical Support</li>

            </ul>

            <button
                class="solution-btn"
                onclick="openQuoteModal('${solution.solution_name}')">

                Contact Us

            </button>

        </div>

        `;

    });

}

loadSolutions();