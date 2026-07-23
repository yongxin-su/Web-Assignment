document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("rememberedName");
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedName && savedEmail) {
        document.getElementById("loginName").value = savedName;
        document.getElementById("loginEmail").value = savedEmail;
        document.getElementById("rememberMe").checked = true;
    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            login();
        });
    }

    const inputs = document.querySelectorAll("#loginForm input");
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
    const name = document.getElementById("loginName").value.trim();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
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
        localStorage.setItem("rememberedName", name);
        localStorage.setItem("rememberedEmail", email);
    } else {
        localStorage.removeItem("rememberedName");
        localStorage.removeItem("rememberedEmail");
    }

    window.location.href = "home.html";
}

function closeModal() {
    const loginModal = document.getElementById("loginModal");
    const errorMsg = document.getElementById("errorMsg");

    if (loginModal) {
        loginModal.style.display = "none";
    }
    if (errorMsg) {
        errorMsg.innerText = "Please fill in the blanks";
    }
}

function forgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();

    if (!email) {
        alert("Please enter your email address first so we can send a reset link.");
        document.getElementById("loginEmail").focus();
        return;
    }

    alert("Password reset instructions have been sent to " + email);
}