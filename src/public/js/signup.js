/*SIGNUP*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlU = URLorigin + "/api/users",
  UrlCook = URLorigin + "/api/",
  Urlsession = URLorigin + "/api/sessions/session",
Urlsignup = URLorigin + "/api/sessions/signup",
UrlLogin = URLorigin + "/api/sessions/login";

let SignUp = document.querySelector(".btnSignUp"),
  Login = document.querySelector(".btnLogin"),
  checkbox = document.querySelector(".form-check-input"),
  label = document.querySelectorAll(".form-label"),
  form = document.querySelector("form"),
  ageInput = document.querySelector(".signup__age");

const user = document.querySelector(".signup__user"),
  password = document.querySelector(".signup__psw"),
  inputFirstName = document.getElementById("first_name"),
  inputLastName = document.getElementById("last_name"),
  inputEmail = document.getElementById("email"),
  inputAge = document.getElementById("age"),
  inputPassword = document.getElementById("password"),
  btnViewPsw = document.getElementById("btnTogglePsw");

/*****************************************************************CLASES*************************************************************/
class NewCart {
  constructor() {
    this.products = [{ status: "sucess", payload: [] }];
  }
}

class NewUser {
  constructor() {
    this.first_name = inputFirstName.value;
    this.last_name = inputLastName.value;
    this.email = inputEmail.value;
    this.age = inputAge.value;
    this.password = inputPassword.value;
  }
}

class LoginUser {
  constructor() {
    this.email = inputEmail.value;
    this.password = inputPassword.value;
  }
}

/*****************************************************************FUNCIONES*************************************************************/
async function startSession(user) {
  try {
    let response = await fetch(UrlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(user),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function setDataCookie(data) {
  try {
    fetch(UrlCook + "setUserCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
  } catch {
    console.log(Error);
  }
}

async function getUser(params) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    let response = await fetch(`${UrlU}?${queryParams}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log(Error);
  }
}

async function postUser(user) {
  try {
    let response = await fetch(Urlsignup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(user),
    });
    const dataRes = await response.json();
    return { status: response.status, userData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function age() {
  let listAge;
  for (let i = 18; i < 70; i++) {
    listAge += `<option value="${i}">${i}</option>`;
  }
  ageInput.innerHTML = `${listAge}`;
}

/*****************************************************************EVENTOS*************************************************************/
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newUser = new NewUser();
  const { status, userData } = await postUser(newUser);
  if (status == 201) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Successful registration",
      text: userData.success,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    setDataCookie({ user: userData.email, timer: 300000 }); //Cookie de sesion nueva registrada, duración 5 min.
    const userLogin = new LoginUser();
    const { sessionData } = await startSession(userLogin);
    const userSession = sessionData.session;
    userSession.admin ? (role = "admin") : (role = "user");
    sessionStorage.setItem(
      "userSession",
      JSON.stringify({ msj: sessionData.success, role: role })
    );
    setTimeout(() => {
      window.location.href = "../products";
    }, 2000),
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logging in...",
        text: userData.success,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
  } else if (status === 400 || 409) {
    Swal.fire({
      title: "Registration Error",
      text: userData.error,
      icon: "error",
      confirmButtonText: "Accept",
    });
    inputEmail.value = "";
    inputEmail.focus();
  }
});

Login.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "../login";
});

btnViewPsw.addEventListener("click", function () {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    btnViewPsw.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    inputPassword.type = "password";
    btnViewPsw.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }
});

age();


