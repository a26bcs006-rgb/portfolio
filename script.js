
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// DARK AND LIGHT MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☾" : "☼";
});

// TYPING ANIMATION
const typingText = document.getElementById("typingText");

const roles = [
  "Frontend Developer",
  "UI/UX Designer",
  "Python Programmer",
  "AI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingText.textContent = roles[0];
    return;
  }

  const currentRole = roles[roleIndex];

  typingText.textContent = currentRole.substring(0, charIndex);

  if (!deleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  }
  else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  }
  else {
    deleting = !deleting;

    if (!deleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, deleting ? 1000 : 300);
  }
}

typeEffect();

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
  ".section, .skill, .project-card, .cert-card, .timeline-item"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

// ANIMATED SKILL PROGRESS BARS
const skillsSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".progress div");

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          bar.style.width = bar.dataset.level;
        });

        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  skillObserver.observe(skillsSection);
} else {
  skillBars.forEach(bar => {
    bar.style.width = bar.dataset.level;
  });
}

// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || message === "") {
    feedback.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    return;
  }

  feedback.textContent =
    "Thank you, " + name +
    "! Your details passed validation. This is a demo form; no email was sent.";

  contactForm.reset();
});

// FOOTER YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();
