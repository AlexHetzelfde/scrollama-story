document.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing-layer");
  const bgSlides = document.querySelectorAll(".bg-slide");
  const yearDisplay = document.getElementById("year-display");
  const scenes = document.querySelectorAll(".scene");
  let progress = 0;
  let locked = true;

  document.body.style.overflow = "hidden";

  // === ACHTERGROND WISSELEN ===
  function setBackground(index) {
    bgSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  // === GORDIJN ===
  function setProgress(p) {
    progress = Math.max(0, Math.min(1, p));
    landing.style.transform = `translateY(-${progress * 100}vh)`;

    if (progress >= 1 && locked) {
      locked = false;
      document.body.style.overflow = "auto";
      yearDisplay.classList.add("visible");
    }
    if (progress < 1 && !locked) {
      locked = true;
      document.body.style.overflow = "hidden";
      yearDisplay.classList.remove("visible");
    }
  }

  // === JAARTAL INTERPOLATIE ===
  function updateYear() {
    const scrollY = window.scrollY;

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const nextScene = scenes[i + 1];
      const sceneTop = scene.offsetTop;
      const sceneBottom = sceneTop + scene.offsetHeight;

      if (scrollY >= sceneTop && scrollY < sceneBottom) {
        const yearStart = parseInt(scene.dataset.year);
        const yearEnd = nextScene ? parseInt(nextScene.dataset.year) : yearStart;
        const sceneProgress = (scrollY - sceneTop) / scene.offsetHeight;
        const currentYear = Math.round(yearStart + (yearEnd - yearStart) * sceneProgress);
        yearDisplay.textContent = currentYear;
        break;
      }
    }
  }

  // === WHEEL ===
  window.addEventListener("wheel", (e) => {
    if (locked) {
      e.preventDefault();
      setProgress(progress + e.deltaY / window.innerHeight);
      return;
    }
    if (window.scrollY === 0 && e.deltaY < 0) {
      e.preventDefault();
      setProgress(progress + e.deltaY / window.innerHeight);
    }
  }, { passive: false });

  // === TOUCH ===
  let touchStartY = 0;
  window.addEventListener("touchstart", e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener("touchmove", e => {
    if (locked) {
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      setProgress(progress + delta / window.innerHeight);
    }
  }, { passive: false });

  // === SCROLL EVENT VOOR JAARTAL ===
  window.addEventListener("scroll", updateYear);

  // === SCROLLAMA ===
  const scroller = scrollama();
  scroller
    .setup({ step: ".scene", offset: 0.5 })
    .onStepEnter(({ element }) => {
      const index = parseInt(element.dataset.index);
      setBackground(index);
    });

  window.addEventListener("resize", scroller.resize);
});
