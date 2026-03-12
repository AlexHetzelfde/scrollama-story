const scroller = scrollama();

const textLayer = document.getElementById("text-layer");
const backgroundLayer = document.getElementById("background-layer");

let scrollPosition = 0;

const maxScroll = window.innerHeight * 12;



function updateScroll(){

textLayer.style.transform =
`translateY(${-scrollPosition}px)`;

backgroundLayer.style.transform =
`translateY(${-scrollPosition * 0.6}px)`;

}



window.addEventListener("wheel",(e)=>{

scrollPosition += e.deltaY;

if(scrollPosition < 0) scrollPosition = 0;
if(scrollPosition > maxScroll) scrollPosition = maxScroll;

updateScroll();

});



scroller
.setup({
step:".step",
offset:0.5
})

.onStepEnter(response=>{

console.log("Step:",response.index);

});
