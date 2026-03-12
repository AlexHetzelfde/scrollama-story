document.addEventListener("DOMContentLoaded", () => {
  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
      offset: 0.5
    })
    .onStepEnter((response) => {
      console.log("Step:", response.index);
    });

  window.addEventListener("resize", scroller.resize);
});
