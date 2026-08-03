document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("toggle_btn");

    // Default theme is dark (matches the existing homepage.css design).
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        root.classList.add("light-mode");
        if (toggleBtn) toggleBtn.textContent = "◑";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isLight = root.classList.toggle("light-mode");
            toggleBtn.textContent = isLight ? "◑" : "◐";
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
});
