console.log("Contact page loaded");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    formMessage.textContent = "";

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!isValidEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
    }

    formMessage.textContent = "Message sent successfully!";
    contactForm.reset();
});