
let mainDiv = document.getElementById("container");

mainDiv.addEventListener("click", (event) => {
  /********** addemployee****** */
  let addEmp = document.getElementById("addemp");
  let empForm = document.getElementById("add-emp");
  let close = document.getElementById("close");
  let overlay = document.getElementById("overlay");

  /********** deleteemployeee ********/
 deleteEmp = document.getElementById('delete');
 
  if (event.target === empForm) {
    addEmp.style.visibility = "visible";
    addEmp.style.opacity = 1;
    console.log(empForm);
    overlay.style.display = "block";
  }
   else if (event.target === close || event.target === overlay) {
    addEmp.style.visibility = "hidden";
    addEmp.style.opacity = 0;
    overlay.style.display = "none";
  }
else if(event.target ===deleteEmp)
  {

}
});
