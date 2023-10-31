// Drawer function:-------------
function openEditing() {
    const editingDiv = document.querySelector(".editing-div");
    editingDiv.classList.toggle("hidden"); // Toggle the "hidden" class
  }

//   Hide welcome MessageChannel:---------
const intro = document.querySelector(".intro");
intro.addEventListener("click", ()=>{
    intro.style.display = "none";
})