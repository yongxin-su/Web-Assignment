let membership_chosen ="";

document.addEventListener("DOMContentLoaded", () => {

    const loggedin = localStorage.getItem("Username");
  if (loggedin) {
    updateUIForLoggedInUser(loggedin);
  }

  document.getElementById("logout_btn")?.addEventListener("click", logout);
  document.getElementById("toggle_btn")?.addEventListener("click", toggle);
  document.getElementById("payment_back_btn")?.addEventListener("click", () => showPage('membership'));

  const planTriggers = document.querySelectorAll("[data-plan]");
  planTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      const planName = e.currentTarget.getAttribute("data-plan");
      openpayment(planName);
    });
  });

  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      makePayment();
    });
  }
});


function updateUIForLoggedInUser (Username){
    const user_greeting = document.getElementById("userGreeting");
    if (user_greeting){
        user_greeting.innerText = "Hello, " + Username;
    }

    const logout_btn = document.getElementById("logout_btn");
    if (logout_btn){
        logout_btn.style.display = "inline-block";

}
}


function openpayment(type){
    membership_chosen = type;
    const loggedin = localStorage.getItem("Username");

   
    showPaymentPage();

    
}


function logout(){
    localStorage.removeItem('Username');
    window.location.href = "login.html";


}

function showPaymentPage(){
    document.querySelector(".plan-name").innerText = membership_chosen + " Membership";

    if (membership_chosen == "Basic") {
        document.querySelector(".plan-price").innerText = "RM130";
    }
    else if (membership_chosen == "Standard"){
        document.querySelector(".plan-price").innerText = "RM250";
    }
    else if (membership_chosen == "Premium"){
        document.querySelector(".plan-price").innerText = "RM500 ";
    }
    
    showPage("payment_page");

}

//need some help undertsanding/coding this part 
function makePayment() {
    const pay_btn = document.getElementById("pay_btn");
    const btn_text = document.getElementById("btn_text");
    const status = document.getElementById("status");

    pay_btn.disabled = true;
    btn_text.style.display = "none";
    status.innerText = "";

    setTimeout(() => {
        btn_text.style.display = "inline";
        btn_text.innerText = "Success!";
        status.className = "success";
        status.innerText = "Payment Successful! Redirecting back to membership page.";
    
    setTimeout(() => {
        pay_btn.disabled = false;
        btn_text.innerText = "Pay Securely";
        status.innerText = "";
        status.className = "";
        document.getElementById("paymentForm").reset();
        showPage('membership');
    }, 2500);

 }, 1500);
}

function showPage(pageId) {
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
        targetPage.classList.add("active");
    } else {
        console.error(`Page with ID "${pageId}" was not found in the HTML.`);
    }

}


function toggle() {
    
    const current = document.documentElement.getAttribute('dark-theme')
    const newtheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('dark-theme' , newtheme );
    localStorage.setItem('theme', newtheme);
}






