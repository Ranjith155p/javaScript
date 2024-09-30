let mainDiv = document.getElementById("container");
let addEmp = document.getElementById("addemp");
let empForm = document.getElementById("add-emp");
let close = document.getElementById("close");
let overlay = document.getElementById("overlay");
let cancel = document.getElementById("cancel");
mainDiv.addEventListener("click", (event) => {
  /********** addemployee****** */

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
  }
});
// ***************fetch data***********************/
let alldata;
async function getData() {
  try {
    const apiUrl = "http://localhost:3000/employees";
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log("Data fetched:", data);
    alldata = data;
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

console.log(getData());
let limit = 2;
function displayData(data) {
  // renderBtn(limit, alldata);
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
        
       <li><a class="dropdown-item" href='./view.html?id=${
         value.id
       }'> View Details</a></li>

          <li><a class="dropdown-item" onclick =editButton('${
            value.id
          }') href="#">Edit</a></li>
          <li><a class="dropdown-item" onclick ="deleteEmployee('${
            value.id
          }')" href="#">Delete</a></li>
        </ul>
         </div>
      </td>
</tr>`;
  });
  document.getElementById("tablebody").innerHTML = dataCollection;
}
//*************************addNewEmployee*************************/
async function addNewEmployee() {
  let data = formElementCollection();
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
addEmp.addEventListener("click", (event) => {
  let add = document.getElementById("add");
  let edit = document.getElementById("submit");
  var id = document.getElementById("dummyIdInp").value;
  if (event.target === add) {
    addNewEmployee();
  }
  if (event.target === edit) {
    EditEmployee(id);
  }
});
async function EditEmployee(id) {
  let data = formElementCollection();
  try {
    const newEmp = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
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
function formElementCollection() {
  let male = document.getElementById("male").checked;
  let gender;
  if (male) {
    gender = "male";
  } else {
    gender = "female";
  }
  let date = document.getElementById("date").value;
  const form = {
    
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
  return form;
}
// **********************edit*********************//
async function editButton(id) {
  addEmp.style.visibility = "visible";
  addEmp.style.opacity = 1;
  overlay.style.display = "block";
  document.getElementById("submit").style.display = "block";
  document.getElementById("add").style.display = "none";

  let DataCollection = alldata.find((record) => record.id === id);
  document.getElementById("salutation").value = DataCollection.salutation;
  document.getElementById("first-name").value = DataCollection.firstName;
  document.getElementById("last-name").value = DataCollection.lastName;
  document.getElementById("e-mail").value = DataCollection.email;
  document.getElementById("ph-no").value = DataCollection.phone;
  document.getElementById("date").value = DataCollection.dob
    .split("-")
    .reverse()
    .join("-");
  document.getElementById("qualifications").value =
    DataCollection.qualifications;
  document.getElementById("dummyIdInp").value = DataCollection.id;
  document.getElementById("Address").value = DataCollection.address;
  document.getElementById("country").value = DataCollection.country;
  document.getElementById("state").value = DataCollection.state;
  document.getElementById("city").value = DataCollection.city;
  document.getElementById("username").value = DataCollection.username;
  document.getElementById("password").value = DataCollection.password;
  document.getElementById(
    DataCollection.gender === "male" ? "male" : "female"
  ).checked = true;
}
async function deleteEmployee(id) {
  try {
    const deleteEmp = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const content = await deleteEmp.json();
    if (content) {
      const filtereData = alldata.filter((emp) => emp.id != id);
      console.log(filtereData);
      displayData(filtereData);
      // let deleteMsg = document.getElementById("showdelete");
      // deleteMsg.style.display = "block";
      // deleteMsg.innerHTML = `${
      //   filtereData.firstName + filtereData.lastName
      // } is deleted`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// *********************search***************************/

document.getElementById("search").addEventListener("input", (event) => {
  searchEmployee(event);
});

function searchEmployee(event) {
  let search = event.target.value.toLowerCase();
  const searchData = alldata.filter((employee) => {
    let fullname = employee.firstName + employee.lastName;
    if (
      employee.firstName.toLowerCase().includes(search) ||
      employee.lastName.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search) ||
      employee.phone.toLowerCase().includes(search) ||
      fullname.toLowerCase().includes(search)
    ) {
      return employee;
    }
  });
  displayData(searchData);
}
// ************************************PAGINATION_BUTTON********************************************t

function renderBtn(limit, data) {
  let btnUl = document.getElementById("pgBtns");
  let btnNum = Math.ceil(data.length / limit);
  btnUl.innerHTML = "";
  for (let i = 0; i < btnNum; i++) {
    btnUl.innerHTML += `<li> <a class=' py-1 px-3 border '
    id='theBtn-${i}' onclick="pagination('${i}')"> ${i + 1}</a> </li>`;
  }
}
let prevBtn;
function pagination(butonNum) {
  if (prevBtn) {
    document.getElementById(`theBtn-${butonNum}`).classList.remove("activeBtn");
  }
  prev_id = `theBtn-${butonNum}`;
  let startindex = butonNum * limit;
  let endIndex = startindex + limit;
  const pageData = allData.slice(startindex, endIndex);
  displayData(pageData);
  document.getElementById(`theBtn-${butonNum}`).classList.add("activeBtn");
}
function limitCalc() {
  limit = Number(document.getElementById("pg-limit").value);
  const data = allData.slice(0, limit);
  console.log(data);

  displayData(data);
}
