// Bubbling -> inner to outer
const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");

div.addEventListener("click", () => console.log("div clicked"));
form.addEventListener("click", () => console.log("form clicked"));
button.addEventListener("click", () => console.log("button clicked"));
form.addEventListener('submit',(e)=>e.preventDefault())

// event.target vs this.target vs event.currentTarget
div.addEventListener("click", func);
form.addEventListener("click", func);
button.addEventListener("click", func);
form.addEventListener('submit',(e)=>e.preventDefault())
function func(e){
    console.log("currentTarget: ", e.currentTarget.tagName, "target: ", event.target.tagName, "this: ", this.tagName);
    //          button, form, div           button button button        button form div
}

// Event capturing/ trickling
div.addEventListener("click", () => {
    console.log("div clicked")
},{capture:true});
form.addEventListener("click", () => console.log("form clicked"));
button.addEventListener("click", () => console.log("button clicked"));
form.addEventListener('submit',(e)=>e.preventDefault())
div, button, form -> since only div had capture, but button & form had bubbling

div.addEventListener("click", () => {
    console.log("div clicked")
},{capture:true});
form.addEventListener("click", () => {
    console.log("form clicked")
},{capture:true});
button.addEventListener("click", () => {
    console.log("button clicked")
},{capture:true});
form.addEventListener('submit',(e)=>e.preventDefault())     // div, form, button

// stop propagation
div.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("div clicked");
});
form.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("form clicked");
});
button.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("button clicked");
});
form.addEventListener("submit", (e) => e.preventDefault());     // just adding stop propagation to form would result in button, form but not div

// Event delegation
// Instead of adding event listener to each ChannelSplitterNode, we just add to parent
document.querySelector(".parent").addEventListener("click",(e)=>{
    console.log(e.target.closest("SPAN"));
    if(e.target.tagName==="SPAN"){
        window.location.href+= '/' +e.target.className
    }
})

// Form -> button -> div
div.addEventListener("click", () => {
  console.log("div clicked");
});
form.addEventListener(
  "click",
  () => {
    console.log("form clicked");
  },
  { capture: true }
);
button.addEventListener("click", () => console.log("button clicked"));
form.addEventListener("submit", (e) => e.preventDefault());

// Create modal that closes on negative space
const modalBtn = document.querySelector(".modal-btn");
const container = document.querySelector(".modal-container");
modalBtn.addEventListener("click", () => {
  toggleModal(true);
});
function toggleModal(toggle) {
  container.style.display = toggle ? "flex" : "none";
}
container.addEventListener("click", (e) => {
  if (e.target.className === "modal-container") toggleModal(false);
});
