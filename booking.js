window.onload = function() {
    const loggedin = localStorage.getItem("Username");
    if (loggedin) {
        const user_greeting = document.getElementById("userGreeting");
        if (user_greeting) {
            user_greeting.innerText = "Hello, " + loggedin;
        }
        const logout_btn = document.getElementById("logout_btn");
        if (logout_btn) {
            logout_btn.style.display = "inline-block";
        }
        
        // Auto-fill logged-in user's name into the booking form
        const bookNameInput = document.getElementById("bookName");
        if (bookNameInput) {
            bookNameInput.value = loggedin;
        }
    }
};

function toggleDescription(button) {
    const card = button.parentElement;
    const shortDesc = card.querySelector(".class-desc-short");
    const fullDesc = card.querySelector(".class-desc-full");
    
    if (fullDesc.style.display === "none") {
        fullDesc.style.display = "block";
        shortDesc.style.display = "none";
        button.innerText = "Read Less";
    } else {
        fullDesc.style.display = "none";
        shortDesc.style.display = "block";
        button.innerText = "Read More";
    }
}

function filterClasses(category, evt) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Support target highlight via inline event
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }

    const cards = document.querySelectorAll(".class-card");
    cards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function selectClassForBooking(className) {
    const classSelect = document.getElementById("bookClass");
    classSelect.value = className;
    document.getElementById("bookingFormSection").scrollIntoView({ behavior: 'smooth' });
}

function submitBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById("bookName").value.trim();
    const email = document.getElementById("bookEmail").value.trim();
    const selectedClass = document.getElementById("bookClass").value;
    const date = document.getElementById("bookDate").value;
    const health = document.getElementById("healthIssues").value.trim();
    const statusMsg = document.getElementById("bookingStatus");

    if (!name || !email || !selectedClass || !date || !health) {
        statusMsg.className = "booking-status-msg error";
        statusMsg.innerText = "Please complete all fields before registering.";
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        statusMsg.className = "booking-status-msg error";
        statusMsg.innerText = "Please enter a valid email address.";
        return;
    }

    statusMsg.className = "booking-status-msg success";
    statusMsg.innerText = `Booking Confirmed! Thank you, ${name}. A reservation confirmation for "${selectedClass}" on ${date} has been sent to ${email}.`;
    
    document.getElementById("classBookingForm").reset();
}

function logout() {
    localStorage.removeItem('Username');
    location.reload();
}
