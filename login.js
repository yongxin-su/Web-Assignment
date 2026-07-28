document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("rememberName");
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedName && savedEmail) {
        document.getElementById("loginname").value = savedName;
        document.getElementById("loginemail").value = savedEmail;
        document.getElementById("rememberMe").checked = true;
    }


    const loginform = document.getElementById("loginform");
    if (loginform) {
        loginform.addEventListener("submit", (event) => {
            event.preventDefault();
            login();
        });
    }

    const inputs = document.querySelectorAll("#loginform input");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const errorMsg = document.getElementById("errorMsg");
            if (errorMsg) errorMsg.style.display = "none";
        });
    });


    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", forgotPassword);
    }
});

function login() {
    const name = document.getElementById("loginname").value.trim();
    const email = document.getElementById("loginemail").value.trim();
    const password = document.getElementById("loginpassword").value.trim();
    const rememberMe = document.getElementById("rememberMe").checked;
    const errorMsg = document.getElementById("errorMsg");

    if (!name || !email || !password) {
        if (errorMsg) {
            errorMsg.innerText = "Please fill in all the blanks";
            errorMsg.style.display = "block";
            errorMsg.style.color = "red";
        }
        return;
    }


    localStorage.setItem("Username", name);

    if (rememberMe) {
        localStorage.setItem("rememberName", name);
        localStorage.setItem("rememberEmail", email);
    } else {
        localStorage.removeItem("rememberName");
        localStorage.removeItem("rememberEmail");
    }

    window.location.href = "home.html";
}

function closeModel() {
    const loginModel = document.getElementById("loginModel");
    const errorMsg = document.getElementById("errorMsg");

    if (loginModel) {
        loginModel.style.display = "none";
    }
    if (errorMsg) {
        errorMsg.innerText = "Please fill in the blanks";
    }
}

function forgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("loginemail").value.trim();

    if (!email) {
        alert("Please enter your email address first so we can send a reset link.");
        document.getElementById("loginemail").focus();
        return;
    }

    alert("Password reset instructions have been sent to " + email);
}
