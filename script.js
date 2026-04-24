document.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing-layer");
  let progress = 0;
  let locked = true;

  document.body.style.overflow = "hidden";

  function setProgress(p) {
    progress = Math.max(0, Math.min(1, p));
    landing.style.transform = `translateY(-${progress * 100}vh)`;

    if (progress >= 1 && locked) {
      locked = false;
      document.body.style.overflow = "auto";
    }

    if (progress < 1 && !locked) {
      locked = true;
      document.body.style.overflow = "hidden";
    }
  }

  window.addEventListener("wheel", (e) => {
    // Zwart nog niet weg: alles onderscheppen
    if (locked) {
      e.preventDefault();
      setProgress(progress + e.deltaY / window.innerHeight);
      return;
    }

    // Hoofdpagina staat op top EN gebruiker scrollt omhoog: zwart terugbrengen
    if (window.scrollY === 0 && e.deltaY < 0) {
      e.preventDefault();
      setProgress(progress + e.deltaY / window.innerHeight);
    }
  }, { passive: false });

  // Scrollama (meteen initialiseren)
  const scroller = scrollama();
  scroller
    .setup({ step: ".step", offset: 0.5 })
    .onStepEnter((response) => {
      document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
      response.element.classList.add("active");
    });

  window.addEventListener("resize", scroller.resize);
});
