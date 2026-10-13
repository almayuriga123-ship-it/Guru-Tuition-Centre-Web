// =========================================
// GURU TUITION CENTRE - JAVASCRIPT
// =========================================


// MOBILE MENU
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// CLOSE MOBILE MENU WHEN A LINK IS CLICKED
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// NAVBAR SCROLL EFFECT
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    ".section, .course-card, .faculty-card, .facility-card"
);

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-target"));
    let current = 0;

    const updateCounter = () => {
        const increment = target / 100;

        if (current < target) {
            current += increment;

            counter.textContent = Math.ceil(current);

            setTimeout(updateCounter, 20);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
});


// BACK TO TOP BUTTON
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



// ADMISSION FORM


const admissionForm = document.querySelector("#admissionForm");

if (admissionForm) {
    admissionForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = admissionForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        const formData = new FormData(admissionForm);

        const data = {
            studentName: formData.get("studentName") || "",
            parentName: formData.get("parentName") || "",
            parentPhone: formData.get("parentPhone") || "",
            studentClass: formData.get("studentClass") || "",
            course: formData.get("course") || "",
            message: formData.get("message") || ""
        };

        const phone = String(data.parentPhone).trim();

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        try {
            await fetch("https://script.google.com/macros/s/AKfycbyCXFbvZYgZYYiMrhVCQM6y5lNV-CfZ4a_DAJD9ueuEYUo6hqxQ2lqzjEnfdmI36SYI8A/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            });

            alert(
                "Thank you for your enquiry! 🎓\n" +
                "Your enquiry request has been sent. " +
                "Please contact us if you need confirmation."
            );

            admissionForm.reset();

        } catch (error) {
            console.error("Admission form error:", error);
            alert(
                "Unable to send your enquiry. " +
                "Please check your internet connection and try again."
            );

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}



// CONTACT FORM
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        alert(
            "Your message has been submitted successfully! 📩"
        );

        contactForm.reset();
    });
}


// CURRENT YEAR
const yearElement = document.querySelector("#currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// CONSOLE MESSAGE
console.log("Guru Tuition Centre website loaded successfully! 🎓");

/* Highlight navigation link based on visible section */
const pageSections = document.querySelectorAll("section[id]");
const menuLinks = document.querySelectorAll(".nav-links a");

function highlightActiveMenu() {
    let currentSection = "";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    menuLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", highlightActiveMenu);
window.addEventListener("load", highlightActiveMenu);
