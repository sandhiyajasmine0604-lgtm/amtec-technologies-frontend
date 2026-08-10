// Load Sidebar Automatically

document.addEventListener("DOMContentLoaded", async () => {

    const sidebarContainer = document.getElementById("sidebar-container");

    if (!sidebarContainer) return;

    const response = await fetch("../components/sidebar.html");

    sidebarContainer.innerHTML = await response.text();

    // Highlight Current Page

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    document.querySelectorAll(".sidebar-menu a").forEach(link => {

        if (link.dataset.page === currentPage) {

            link.classList.add("active");

        }

    });

});