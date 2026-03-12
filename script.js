document.addEventListener("DOMContentLoaded", () => {

  // ====== SCROLLAMA SETUP ======
  const scroller = scrollama();

  const textLayer = document.getElementById("text-layer");
  const backgroundLayer = document.getElementById("background-layer");
  const steps = document.querySelectorAll(".step");

  let scrollPosition = 0;
  let maxScroll = window.innerHeight * steps.length;

  function updateScroll() {
    // Parallax: text-layer
    textLayer.style.transform = `translateY(${-scrollPosition}px)`;
    // Parallax: background-layer (langzaam)
    backgroundLayer.style.transform = `translateY(${-scrollPosition * 0.6}px)`;
  }

  // Handmatige scroll via wheel
  window.addEventListener("wheel", (e) => {
    scrollPosition += e.deltaY;

    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;

    updateScroll();
  });

  // Scrollama triggers
  scroller
    .setup({
      step: ".step",
      offset: 0.5
    })
    .onStepEnter((response) => {
      console.log("Step:", response.index);
    });

  // Update maxScroll bij resize
  window.addEventListener("resize", () => {
    maxScroll = window.innerHeight * steps.length;
  });

  // ====== GORDIJN-LANDING EFFECT (WHEEL GEBRUIK) ======
  const landingLayer = document.getElementById("landing-layer");

window.addEventListener("wheel", (e) => {
  // deltaY < 0 betekent scroll omhoog
  if (e.deltaY < 0) {
    landingLayer.style.transform = "translateY(-100%)"; // gordijn omhoog
  }
});

});
