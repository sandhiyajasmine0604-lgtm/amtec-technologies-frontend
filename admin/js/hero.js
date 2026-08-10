const currentPage="hero";
const imageInput = document.getElementById("bannerImage");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        preview.src = e.target.result;

    };

    reader.readAsDataURL(file);

});

document.getElementById("saveHero").addEventListener("click", () => {

    alert("Hero Banner Saved Successfully!");

});