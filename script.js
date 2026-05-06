const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

const animatedItems = document.querySelectorAll(
  ".section, .hero-card, .project-card, .about-cards article, .other-grid article"
);

animatedItems.forEach((item, index) => {
  item.classList.add("fade-up");
  item.style.transitionDelay = `${index * 80}ms`;
  observer.observe(item);
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      message: formData.get("message")?.toString().trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      formStatus.textContent = "Please fill out every field.";
      return;
    }

    formStatus.textContent = "Sending...";

    try {
      const response = await fetch("https://contact.eags.dev/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      contactForm.reset();
      formStatus.textContent = "Message sent. Thanks for reaching out.";
    } catch (error) {
      formStatus.textContent = "Something went wrong. Please try again later.";
    }
  });
}
