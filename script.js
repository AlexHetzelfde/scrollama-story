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

  // HEIGHT van landing layer
const landingLayer = document.getElementById("landing-layer");
const landingHeight = landingLayer.offsetHeight;
const container = document.getElementById("container");
const textLayer = document.getElementById("text-layer");
const backgroundLayer = document.getElementById("background-layer");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY < landingHeight) {
    // FASE 1: alleen landing page scroll
    container.style.top = "0px"; // storytelling blijft op z'n plek
    textLayer.style.transform = "translateY(0px)";
    backgroundLayer.style.transform = "translateY(0px)";
  } else {
    // FASE 2: storytelling scroll begint
    const scrollPosition = scrollY - landingHeight;
    container.style.top = "0px"; // kan blijven staan
    textLayer.style.transform = `translateY(${-scrollPosition}px)`;
    backgroundLayer.style.transform = `translateY(${-scrollPosition * 0.6}px)`;
  }
});

});
