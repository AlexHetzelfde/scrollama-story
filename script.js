document.addEventListener("DOMContentLoaded", () => {

  const landing = document.getElementById("landing-layer");

  const vh = window.innerHeight;
  let unlocked = false;

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    // =========================
    // GORDIJN ANIMATIE
    // =========================
    if (scrollY < vh) {

      const progress = scrollY / vh;

      landing.style.transform = `translateY(-${progress * 100}vh)`;

    }

    // =========================
    // UNLOCK MOMENT
    // =========================
    if (scrollY >= vh && !unlocked) {

      unlocked = true;

      landing.style.transform = "translateY(-100vh)";

      startScrollama();
    }

  });

  // =========================
  // SCROLLAMA START
  // =========================
  function startScrollama() {

    const scroller = scrollama();

    scroller
      .setup({
        step: ".step",
        offset: 0.5
      })
      .onStepEnter((response) => {

        document.querySelectorAll(".step").forEach(step => {
          step.classList.remove("active");
        });

        response.element.classList.add("active");

      });

    window.addEventListener("resize", scroller.resize);
  }

});
