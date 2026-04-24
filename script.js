// script.js

document.addEventListener("DOMContentLoaded", () => {

  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
      offset: 0.5
    })

    .onStepEnter((response) => {

      // alle steps resetten
      document.querySelectorAll(".step").forEach(step => {
        step.classList.remove("active");
      });

      // huidige step activeren
      response.element.classList.add("active");

      console.log("Step:", response.index);
    });

  window.addEventListener("resize", scroller.resize);

});
