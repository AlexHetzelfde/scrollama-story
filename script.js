document.addEventListener("DOMContentLoaded", () => {

  const scroller = scrollama();

  const textLayer = document.getElementById("text-layer");
  const backgroundLayer = document.getElementById("background-layer");
  const steps = document.querySelectorAll(".step");

  let maxScroll = window.innerHeight * steps.length;

  // Scrollama setup
  scroller
    .setup({
      step: ".step",
      offset: 0.5
    })
    .onStepEnter((response) => {
      console.log("Step:", response.index);
    });

  // update bij resize
  window.addEventListener("resize", () => {
    maxScroll = window.innerHeight * steps.length;
  });

  // PARALLAX SCROLL
  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    textLayer.style.transform = `translateY(${-scrollY}px)`;
    backgroundLayer.style.transform = `translateY(${-scrollY * 0.6}px)`;

  });

});
