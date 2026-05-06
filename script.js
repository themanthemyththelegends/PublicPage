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
