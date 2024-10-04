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
let limit = 2;
async function getData() {
  try {
    const apiUrl = "http://localhost:3000/employees";
    const response = await fetch(apiUrl);
    const data = await response.json();
    alldata = data;
    displayData(data.slice(0, limit));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

console.log(getData());

function displayData(data) {
  renderBtn(limit);
  let dataCollection = "";
  data.forEach((value, index) => {
    dataCollection += `<tr>
    <td>#0${index + 1}</td>
    <td> 
    <img src="http://localhost:3000/employees/${
      value.id
    }/avatar" class="rounded-circle me-2 "style ="width:50px" alt=" ">${
      value.salutation
    }
    ${value.firstName} ${value.lastName}</td> 
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
            <li><a class="dropdown-item" onclick =deleteEmployee('${
              value.id
            }') href="#">Delete</a></li>
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
    let response = await newEmp.json();
    if (response) {
      console.log(data.avatar);
      await imagePost(response.id);
      data.id = response.id;
      alldata.unshift(data);
      displayData(alldata);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
addEmp.addEventListener("click", (event) => {
  let add = document.getElementById("add");
  let edit = document.getElementById("submit");
  var id = document.getElementById("dummyIdInp").value;
  if (event.target === add) {
    // ***********************validation****************************
    const salutationError = document.getElementById("salutationErr");
    const firstnameError = document.getElementById("firstnameErr");
    const lastnameError = document.getElementById("lastnameErr");
    const emailError = document.getElementById("emailErr");
    const mobileError = document.getElementById("mobileNumErr");
    const dobError = document.getElementById("dobErr");
    const qualificationError = document.getElementById("qualificationErr");
    const addressError = document.getElementById("addressErr");
    const countryError = document.getElementById("countryErr");
    const stateError = document.getElementById("stateErr");
    const cityError = document.getElementById("cityErr");
    // const zipError = document.getElementById("zipErr");
    const usernameError = document.getElementById("userNameErr");
    const passwordError = document.getElementById("passwordErr");
    let isValid = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    let data = formElementCollection();
    // console.log(data);
    // data;
    if (data.salutation.trim() === "select salutation") {
      salutationError.textContent = "Salutation is required!";
      isValid = false;
    } else {
      salutationError.textContent = "";
    }
    if (data.firstName.trim() === "") {
      firstnameError.textContent = "First name is required!";
      isValid = false;
    } else {
      firstnameError.textContent = "";
    }
    if (data.lastName.trim() === "") {
      lastnameError.textContent = "Last name is required!";
      isValid = false;
    } else {
      lastnameError.textContent = "";
    }
    if (data.email.trim() === "") {
      emailError.textContent = "Email is required!";
      isValid = false;
    } else if (!emailRegex.test(data.email.trim())) {
      emailError.textContent = "Invalid email format!";
      isValid = false;
    } else {
      emailError.textContent = "";
    }
    if (data.phone.trim() === "") {
      mobileError.textContent = "Mobile number is required!";
      isValid = false;
    } else if (!mobileRegex.test(data.phone.trim())) {
      mobileError.textContent = "Mobile number must be 10 digits!";
      isValid = false;
    } else {
      mobileError.textContent = "";
    }
    if (data.dob.trim() === "") {
      dobError.textContent = "dob is requared";
      isValid = false;
    } else {
      dobError.textContent = "";
    }
    if (data.qualifications.trim() === "") {
      qualificationError.textContent = "Qualification  required!";
      isValid = false;
    } else {
      qualificationError.textContent = "";
    }
    if (data.address.trim() === "") {
      addressError.textContent = "Address required!";
      isValid = false;
    } else {
      addressError.textContent = "";
    }
    if (data.country.trim() === "Select country") {
      countryError.textContent = "country name required!";
      isValid = false;
    } else {
      countryError.textContent = "";
    }
    if (data.state.trim() === "Select state") {
      stateError.textContent = "setat name required!";
      isValid = false;
    } else {
      stateError.textContent = "";
    }
    if (data.city.trim() === "") {
      cityError.textContent = "ity name required!";
      isValid = false;
    } else {
      cityError.textContent = "";
    }
    // if (data.zip.trim() === "") {
    //   zipError.textContent = "zip/pin required!";
    //   isValid = false;
    // } else {
    //   zipError.textContent = "";
    // }
    if (data.username.trim() === "") {
      usernameError.textContent = "Last name is required!";
      isValid = false;
    } else {
      usernameError.textContent = "";
    }
    if (data.password.trim() === "") {
      passwordError.textContent = "Password is required!";
      isValid = false;
    } else if (!passwordRegex.test(data.password.trim())) {
      passwordError.textContent =
        "Password must contain at least one capital letter and one number!";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }
    if (isValid) {
      let Data = formElementCollection();
      addEmp.style.opacity = "0";
      addEmp.style.visibility = "hidden";
      document.getElementById("overlay").style.display = "none";
      addNewEmployee(Data);
    }
  }
  if (event.target === edit) {
    EditEmployee(id);
  }
});
// *********************************************Edit Employeee details *****************************
async function EditEmployee(id, isNewEntry = false) {
  let data = formElementCollection();
  try {
    const newEmp = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await newEmp.json();

    if (response) {
      const imageFile = document.getElementById("proImage").files[0];

      if (isNewEntry || imageFile) {
        await imagePost(id);
      }

      const updatedData = alldata.map((emp) =>
        emp.id === id ? { ...emp, ...data } : emp
      );
      alldata = updatedData;
      displayData(alldata);
      addEmp.reset();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// ********************updated data collection*************************
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
    // avatar: document.getElementById("proImage").value,
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
    // zip: document.getElementById("zip").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    gender: gender,
    dob: date.split("-").reverse().join("-"),
  };
  return form;
}
// **********************edit*********************//
async function editButton(id) {
  addEmp.style.opacity = 1;
  overlay.style.display = "block";
  addEmp.style.visibility = "visible";
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
  // document.getElementById("zip").value = DataCollection.zip;
  document.getElementById("username").value = DataCollection.username;
  document.getElementById("password").value = DataCollection.password;
  document.getElementById(
    DataCollection.gender === "male" ? "male" : "female"
  ).checked = true;
}

// *************************deleteEmployee******************

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
      let balanceData = alldata.filter((emp) => emp.id != id);
      console.log(balanceData);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          displayData(balanceData);
        }
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Something went wrong!",
      text: "employee didn't updated!",
      icon: "error",
    });
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
// function renderBtn(limit) {
//   let btnUl = document.getElementById("paginationlist");
//   let btnNum = Math.ceil(alldata.length / limit);
//   // console.log(btnNum,limit,data.length);
//   btnUl.innerHTML = "";
//   for (let i = 0; i < btnNum; i++) {
//     btnUl.innerHTML += `<li> <a class=' py-1 px-3 border '
//       id='theBtn-${i}' onclick="pagination('${i}')"> ${i + 1}</a> </li>`;
//   }
// }
// let prevBtn;
// function pagination(butonNum) {
//   if (prevBtn) {
//     document.getElementById(`theBtn-${butonNum}`).classList.remove("activeBtn");
//   }
//   prev_id = `theBtn-${butonNum}`;
//   let startindex = butonNum * limit;
//   let endIndex = startindex + limit;
//   const pageData = alldata.slice(startindex, endIndex);
//   displayData(pageData);
//   document.getElementById(`theBtn-${butonNum}`).classList.add("activeBtn");
// }
// function limitCalc() {
//   limit = Number(document.getElementById("pg-limit").value);
//   const data = alldata.slice(0, limit);
//   console.log(data);
//   displayData(data);
//   renderBtn(limit, data);
// }
let prevBtn;
// limit;

function renderBtn(limit) {
  let btnUl = document.getElementById("paginationlist");
  let btnNum = Math.ceil(alldata.length / limit);
  btnUl.innerHTML = "";
  for (let i = 0; i < btnNum; i++) {
    btnUl.innerHTML += `<li> <a class=' py-1 px-3 border '
      id='theBtn-${i}' onclick="pagination('${i}')"> ${i + 1}</a> </li>`;
  }
}

function pagination(butonNum) {
  if (prevBtn) {
    document.getElementById(prevBtn).classList.remove("activeBtn");
  }
  let startindex = butonNum * limit;
  let endIndex = startindex + limit;
  const pageData = alldata.slice(startindex, endIndex);
  displayData(pageData);
  let currentBtnId = `theBtn-${butonNum}`;
  document.getElementById(currentBtnId).classList.add("activeBtn");
  prevBtn = currentBtnId; // Update the previous button reference
}

function limitCalc() {
  limit = Number(document.getElementById("pg-limit").value);
  const data = alldata.slice(0, limit);
  displayData(data);
  renderBtn(limit); // No need to pass data
}

// *****************UploadImage*************************
document
  .getElementById("proImage")
  .addEventListener("change", function (event) {
    image = event.target.files[0]; // Store the selected file
  });

let image;
document.getElementById("proImage").addEventListener("input", function (event) {
  event.stopPropagation();
  image = event.target.files[0];
});
async function imagePost(id) {
  try {
    let img = new FormData();
    img.append("avatar", image);
    console.log(image);

    let api = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
      method: "POST",
      body: img,
    });
    console.log(api);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    document.getElementById("overlay").style.display = "flex";
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
  }
}

// ***************************page validation******************************

let saveChange = document.getElementById("submit");
saveChange.addEventListener("click", (event) => {
  event.preventDefault();
  const salutationError = document.getElementById("salutationErr");
  const firstnameError = document.getElementById("firstnameErr");
  const lastnameError = document.getElementById("lastnameErr");
  const emailError = document.getElementById("emailErr");
  const mobileError = document.getElementById("mobileNumErr");
  const dobError = document.getElementById("dobErr");
  const qualificationError = document.getElementById("qualificationErr");
  const addressError = document.getElementById("addressErr");
  const countryError = document.getElementById("countryErr");
  const stateError = document.getElementById("stateErr");
  const cityError = document.getElementById("cityErr");
  // const zipError = document.getElementById("zipErr");
  const usernameError = document.getElementById("userNameErr");
  const passwordError = document.getElementById("passwordErr");
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-validat9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  let data = formElementCollection();
  // console.log(data);
  // data;
  if (data.salutation.trim() === "select salutation") {
    salutationError.textContent = "Salutation is required!";
    isValid = false;
  } else {
    salutationError.textContent = "";
  }
  if (data.firstName.trim() === "") {
    firstnameError.textContent = "First name is required!";
    isValid = false;
  } else {
    firstnameError.textContent = "";
  }
  if (data.lastName.trim() === "") {
    lastnameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    lastnameError.textContent = "";
  }
  if (data.email.trim() === "") {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else if (!emailRegex.test(data.email.trim())) {
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  if (data.phone.trim() === "") {
    mobileError.textContent = "Mobile number is required!";
    isValid = false;
  } else if (!mobileRegex.test(data.phone.trim())) {
    mobileError.textContent = "Mobile number must be 10 digits!";
    isValid = false;
  } else {
    mobileError.textContent = "";
  }
  if (data.dob.trim() === "") {
    dobError.textContent = "dob is requared";
    isValid = false;
  } else {
    dobError.textContent = "";
  }
  if (data.qualifications.trim() === "") {
    qualificationError.textContent = "Last name is required!";
    isValid = false;
  } else {
    qualificationError.textContent = "";
  }
  if (data.address.trim() === "") {
    addressError.textContent = "Last name is required!";
    isValid = false;
  } else {
    addressError.textContent = "";
  }
  if (data.country.trim() === "Select country") {
    countryError.textContent = "Last name is required!";
    isValid = false;
  } else {
    countryError.textContent = "";
  }
  if (data.state.trim() === "Select state") {
    stateError.textContent = "Last name is required!";
    isValid = false;
  } else {
    stateError.textContent = "";
  }
  if (data.city.trim() === "") {
    cityError.textContent = "Last name is required!";
    isValid = false;
  } else {
    cityError.textContent = "";
  }
  // if (data.zip.trim() === "") {
  //   zipError.textContent = "zip required!";
  //   isValid = false;
  // } else {
  //   zipError.textContent = "";
  // }
  if (data.username.trim() === "") {
    usernameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    usernameError.textContent = "";
  }
  if (data.password.trim() === "") {
    passwordError.textContent = "Password is required!";
    isValid = false;
  } else if (!passwordRegex.test(data.password.trim())) {
    passwordError.textContent =
      "Password must contain at least one capital letter and one number!";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }
  if (isValid) {
    let Data = formElementCollection();
    // EditEmployee(Data);
    addEmp.style.opacity = "0";
    addEmp.style.visibility = "hidden";
    document.getElementById("overlay").style.display = "none";
  }
});
document.getElementById("first-name").addEventListener("input", function () {
  document.getElementById("firstnameErr").textContent = "";
});

document.getElementById("last-name").addEventListener("input", function () {
  document.getElementById("lastnameErr").textContent = "";
});
document.getElementById("e-mail").addEventListener("input", function () {
  document.getElementById("emailErr").textContent = "";
});
document.getElementById("ph-no").addEventListener("input", function () {
  document.getElementById("mobileNumErr").textContent = "";
});
document.getElementById("date").addEventListener("input", function () {
  document.getElementById("dobErr").textContent = "";
});
document
  .getElementById("qualifications")
  .addEventListener("input", function () {
    document.getElementById("qualificationErr").textContent = "";
  });
document.getElementById("Address").addEventListener("input", function () {
  document.getElementById("addressErr").textContent = "";
});
document.getElementById("country").addEventListener("input", function () {
  document.getElementById("countryErr").textContent = "";
});
document.getElementById("state").addEventListener("input", function () {
  document.getElementById("stateErr").textContent = "";
});
document.getElementById("city").addEventListener("input", function () {
  document.getElementById("cityErr").textContent = "";
});
document.getElementById("zip").addEventListener("input", function () {
  document.getElementById("zipErr").textContent = "";
});
document.getElementById("username").addEventListener("input", function () {
  document.getElementById("userNameErr").textContent = "";
});
document.getElementById("password").addEventListener("input", function () {
  document.getElementById("passwordErr").textContent = "";
});
document.getElementById("salutation").addEventListener("input", function () {
  document.getElementById("salutationErr").textContent = "";
});
