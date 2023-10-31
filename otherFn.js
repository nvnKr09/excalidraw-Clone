// Drawer function:-------------
function openEditing() {
    const editingDiv = document.querySelector(".editing-div");
    editingDiv.classList.toggle("hidden"); // Toggle the "hidden" class
};

//   Hiding intro:---------
const intro = document.querySelector(".intro");
intro.addEventListener("click", () => {
  intro.style.display = "none";
});

// lock button
const lock = document.getElementById("lock");
lock.addEventListener("click", () =>{
  lock.classList.toggle("active-btn");

  // Getting a reference to the <i> element inside the button
  const icon = lock.querySelector("i");

  // Toggle the icon based on the class
  if (lock.classList.contains("active-btn")) {
    icon.classList.remove("fa-unlock");
    icon.classList.add("fa-lock");
  } else {
    icon.classList.remove("fa-lock");
    icon.classList.add("fa-unlock");
  }
});
  