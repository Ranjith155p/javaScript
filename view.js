let salutation = document.getElementById("salutation");
let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let email = document.getElementById("email");
let mobileNumber = document.getElementById("mobileNumber");
let dob = document.getElementById("dob");
let male = document.getElementById("male");
let female = document.getElementById("female");
let qualifications = document.getElementById("Qualifications");
let address = document.getElementById("address");
let country = document.getElementById("country");
let state = document.getElementById("state");
let city = document.getElementById("city");
let zip = document.getElementById("zip");
let username = document.getElementById("username");
let password = document.getElementById("password");

let empName = document.getElementById("empName");
let empGmail = document.getElementById("empGmail");
let empGender = document.getElementById("empGender");
let empAge = document.getElementById("empAge");
let empDob = document.getElementById("empDob");
let empPhone = document.getElementById("empPhone");
let empQualification = document.getElementById("empQualification");
let empAddress = document.getElementById("empAddress");
let empUserName = document.getElementById("empUserName");
let profileImg = document.getElementById("proImage");

// *******************************VIEW_DATA*************************************

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log(id);
let user = [];
async function viewPage() {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`);
    let data = await api.json();
    console.log(data);
    user = data;
    valueAdd(data);
  } catch (error) {
    console.log(error);
  }
}

viewPage();

// ***************************VIEW_PAGE_INPUT************************************

let empData;
function valueAdd(emp) {
  empData = emp;
  profileImg.src = `http://localhost:3000/employees/${emp.id}/avatar`;
  empName.innerHTML = emp.firstName + emp.lastName;
  empGmail.innerHTML = emp.email;
  empGender.innerHTML = emp.gender;
  let dob = emp.dob.split("-")[2];
  let age = 2024 - dob;
  empAge.innerHTML = age;
  empDob.innerHTML = emp.dob;
  empPhone.innerHTML = emp.phone;
  empQualification.innerHTML = emp.qualifications;
  empAddress.innerHTML = emp.address;
  empUserName.innerHTML = emp.username;
}

// ******************************IMAGE_POST**********************************

let image;
document
  .getElementById("viewProImage")
  .addEventListener("input", function (event) {
    event.stopPropagation();
    image = event.target.files[0];
  });

async function imagePost(id) {
  let img = new FormData();
  img.append("avatar", image);
  let api = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
    method: "POST",
    body: img,
  });
  return api;
}

// **************************DELETE_DATA***********************************

document.getElementById("dltBtn").addEventListener("click", function (event) {
  Alert(id);
});

function Alert(id) {
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
      deleteEmployee(id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      window.location.href = "index.html";
    }
  });
}

async function deleteEmployee(id) {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    });
    let response = await api.json();
  } catch (error) {
    Swal.fire({
      title: "Something went wrong!",
      text: "employee didn't updated!",
      icon: "error",
    });
  }
}

// **************************RETURN_DATA_TO_INPUT*****************************

function editor(user) {
  salutation.value = user.salutation;
  firstname.value = user.firstName;
  lastname.value = user.lastName;
  email.value = user.email;
  mobileNumber.value = user.phone;
  dob.value = user.dob.split("-").reverse().join("-");
  if (user.gender == "Male") {
    male.checked = true;
  } else {
    female.checked = true;
  }
  qualifications.value = user.qualifications;
  address.value = user.address;
  country.value = user.country;
  state.value = user.state;
  city.value = user.city;
  zip.value = user.zip;
  username.value = user.username;
  password.value = user.password;
}

document.getElementById("emp-sec").addEventListener("click", function (event) {
  console.log(event);
  let BasicDtl = document.getElementById("BasicDtl");
  if (event.target.id == "editBtn") {
    editor(empData);
    console.log(empData);
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
    document.getElementById("overlay").style.display = "block";
  } else if (
    event.target.id == "formCancelBtn" ||
    event.target.id == "overlay"
  ) {
    BasicDtl.style.opacity = "0px";
    BasicDtl.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
});

// ******************************UPDATE_EDITED_DATA**************************************

function updatedData() {
  let Dob = dob.value.split("-").reverse().join("-");
  return {
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    phone: mobileNumber.value,
    dob: Dob,
    gender: male.checked ? "Male" : female.checked ? "Female" : "Unknown",
    qualifications: qualifications.value,
    address: address.value,
    country: country.value,
    state: state.value,
    city: city.value,
    zip: zip.value,
    username: username.value,
    password: password.value,
  };
}

async function editEmployee(Data) {
  try {
    let api = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    let response = await api.json();
    await imagePost(id);
    profileImg.src = `http://localhost:3000/employees/${id}/avatar`;
    console.log(response);
    Swal.fire({
      title: "Good job!",
      text: "Updated Sucessfully!",
      icon: "success",
    });
  } catch (error) {
    Swal.fire({
      title: "Something went wrong!",
      text: "employee didn't updated!",
      icon: "error",
    });
    document.getElementById("overlay").style.display = "flex";
    BasicDtl.style.opacity = "1px";
    BasicDtl.style.display = "flex";
  }
}

// *******************************SAVE-CHANGE-FOR-UPDATE-AND-PAGE-VALIDATION**************************************

let saveChange = document.getElementById("submit");
saveChange.onclick = function (event) {
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
  const zipError = document.getElementById("zipErr");
  const usernameError = document.getElementById("userNameErr");
  const passwordError = document.getElementById("passwordErr");
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (salutation.value.trim() === "select salutation") {
    salutationError.textContent = "Salutation is required!";
    isValid = false;
  } else {
    salutationError.textContent = "";
  }
  if (firstname.value.trim() === "") {
    firstnameError.textContent = "First name is required!";
    isValid = false;
  } else {
    firstnameError.textContent = "";
  }
  if (lastname.value.trim() === "") {
    lastnameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    lastnameError.textContent = "";
  }
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  if (mobileNumber.value.trim() === "") {
    mobileError.textContent = "Mobile number is required!";
    isValid = false;
  } else if (!mobileRegex.test(mobileNumber.value.trim())) {
    mobileError.textContent = "Mobile number must be 10 digits!";
    isValid = false;
  } else {
    mobileError.textContent = "";
  }
  if (dob.value.trim() === "") {
    dobError.textContent = "Last name is required!";
    isValid = false;
  } else {
    dobError.textContent = "";
  }
  if (qualifications.value.trim() === "") {
    qualificationError.textContent = "Last name is required!";
    isValid = false;
  } else {
    qualificationError.textContent = "";
  }
  if (address.value.trim() === "") {
    addressError.textContent = "Last name is required!";
    isValid = false;
  } else {
    addressError.textContent = "";
  }
  if (country.value.trim() === "Select country") {
    countryError.textContent = "Last name is required!";
    isValid = false;
  } else {
    countryError.textContent = "";
  }
  if (state.value.trim() === "Select state") {
    stateError.textContent = "Last name is required!";
    isValid = false;
  } else {
    stateError.textContent = "";
  }
  if (city.value.trim() === "") {
    cityError.textContent = "Last name is required!";
    isValid = false;
  } else {
    cityError.textContent = "";
  }
  if (zip.value.trim() === "") {
    zipError.textContent = "Last name is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }
  if (username.value.trim() === "") {
    usernameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }
  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required!";
    isValid = false;
  } else if (!passwordRegex.test(password.value.trim())) {
    passwordError.textContent =
      "Password must contain at least one capital letter and one number!";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }
  if (isValid) {
    let Data = updatedData();
    editEmployee(Data);
    valueAdd(Data);
    console.log(Data);
    BasicDtl.style.opacity = "0px";
    BasicDtl.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
};

document.getElementById("firstName").addEventListener("input", function () {
  document.getElementById("firstnameErr").textContent = "";
});

document.getElementById("lastName").addEventListener("input", function () {
  document.getElementById("lastnameErr").textContent = "";
});
document.getElementById("email").addEventListener("input", function () {
  document.getElementById("emailErr").textContent = "";
});
document.getElementById("mobileNumber").addEventListener("input", function () {
  document.getElementById("mobileNumErr").textContent = "";
});
document.getElementById("dob").addEventListener("input", function () {
  document.getElementById("dobErr").textContent = "";
});
document
  .getElementById("Qualifications")
  .addEventListener("input", function () {
    document.getElementById("qualificationErr").textContent = "";
  });
document.getElementById("address").addEventListener("input", function () {
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
