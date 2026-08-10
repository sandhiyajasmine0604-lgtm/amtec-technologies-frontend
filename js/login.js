window.onload = () => {
    const savedEmail = localStorage.getItem("adminEmail");

    if (savedEmail) {
        document.getElementById("email").value = savedEmail;
        document.getElementById("rememberMe").checked = true;
    }
};
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", () => {
    password.type = showPassword.checked ? "text" : "password";
});
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            alert("Login Successful!");

            localStorage.setItem("token", data.token);

            window.location.href = "dashboard.html";

        } else {

            alert(data.message || "Invalid Email or Password");

        }
if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("adminEmail", email);
} else {
    localStorage.removeItem("adminEmail");
}
    } catch (err) {

        console.error(err);
        alert("Server Error");

    }

});