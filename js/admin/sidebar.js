// Loads the shared sidebar into any admin page that has
// <div id="sidebar-placeholder"></div>, then highlights
// the link matching the current page.

fetch("partials/sidebar.html")
    .then(res => res.text())
    .then(html => {

        document.getElementById("sidebar-placeholder").innerHTML = html;

        highlightActiveLink();

    })
    .catch(err => {
        console.error("Failed to load sidebar:", err);
    });

function highlightActiveLink() {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "") || "dashboard";

    const links = document.querySelectorAll(".sidebar-menu a[data-page]");

    links.forEach(link => {

        if (link.getAttribute("data-page") === currentPage) {
            link.classList.add("active");
        }

    });

}
