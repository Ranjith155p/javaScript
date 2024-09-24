let mainDiv = document.getElementById("container");

mainDiv.addEventListener("click", (event) => {
  /********** addemployee****** */
  let addEmp = document.getElementById("addemp");
  let empForm = document.getElementById("add-emp");
  let close = document.getElementById("close");
  let overlay = document.getElementById("overlay");
  let cancel = document.getElementById("cancel");

  /********** deleteemployeee ********/
  deleteEmp = document.getElementById("delete");

  if (event.target === empForm) {
    addEmp.style.visibility = "visible";
    addEmp.style.opacity = 1;
    overlay.style.display = "block";
  } else if (
    event.target === close ||
    event.target === overlay ||
    event.target === cancel
  ) {
    addEmp.style.visibility = "hidden";
    addEmp.style.opacity = 0;
    overlay.style.display = "none";
  } else if (event.target === deleteEmp) {
  }
});
// fetch data
let alldata;
async function getData() {
  try {
    const apiUrl = "http://localhost:3000/employees";
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Data fetched:", data);
    alldata = data;
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

console.log(getData());

function displayData(data) {
  let dataCollection = "";
  data.forEach((value, index) => {
    dataCollection += `<tr>
   <td>#0${index + 1}</td>
  <td> <img  src="https://mdbootstrap.com/img/new/avatars/8.jpg" style="width:45px;height:"45px" class="rounded-circle"> ${
    value.salutation
  } ${value.firstName} ${value.lastName}</td> 
  <td>  ${value.email}</td>
   <td>  ${value.phone}</td>
    <td>  ${value.gender}</td>
     <td>  ${value.dob}</td>
      <td>  ${value.country}</td>
      <td>
      <div class="dropdown"id="crud">
        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="material-symbols-outlined">
            more_horiz
            </span>
        </button>
        <ul class="dropdown-menu ">
          <li><a class="dropdown-item active"href="#">View Details</a></li>
          <li><a class="dropdown-item" onclick =editemployee() href="#">Edit</a></li>
          <li><a class="dropdown-item" onclick ="deleteEmployee('${value.id}')" href="#">Delete</a></li>
        </ul>
         </div>
      </td>
</tr>`;
  });
  document.getElementById("tablebody").innerHTML = dataCollection;
}
async function addNewEmployee(data) {
  try {
    const newEmp = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await newEmp.json();
    console.log(content);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// console.log(male);

document.getElementById("submit").addEventListener("click", () => {
  let male = document.getElementById("male").checked;
  let gender;
  if (male) {
    gender = "male";
  } else {
    gender = "female";
  }
  let date = document.getElementById("date").value;
  const formElementCollection = {
    salutation: document.getElementById("salutation").value,
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("e-mail").value,
    phone: document.getElementById("ph-no").value,
    qualifications: document.getElementById("qualifications").value,
    address: document.getElementById("Address").value,
    country: document.getElementById("country").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    gender: gender,
    dob: date.split("-").reverse().join("-"),
  };
  addNewEmployee(formElementCollection);
});
async function editemployee()
{
  try {
    const newEmp = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
 catch (error) {
  console.error("Error fetching data:", error);
}
}
async function deleteEmployee(id) {
  try {
    const newEmp = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const content = await newEmp.json();
     if(content){
      const filtereData = alldata.filter((emp)=> emp.id != id)
      console.log(filtereData);
      displayData(filtereData)
     }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
