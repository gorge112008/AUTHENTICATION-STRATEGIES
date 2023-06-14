/*SIGNUP*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlU = URLorigin + "/api/users",
  UrlCook = URLorigin + "/api/",
  Urlsignup = URLorigin + "/sessions/";
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

/*****************************************************************FUNCIONES*************************************************************/

async function startSession(data) {
  try {
    const ruta = Urlsignup + "session";
    console.log(ruta);
    let response = await fetch(Urlsignup + "session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    if (response.status == 400) {
      console.warn("Error en el cliente");
      return;
    } else if (response.status == 200) {
      return response.json();
    }
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
    let response = await fetch(UrlU, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(user),
    });
    if (response.status == 400) {
      console.warn("Error en el cliente");
      return;
    } else if (response.status == 201) {
      return response.json();
    }
  } catch {
    console.log(Error);
  }
}

async function validateUser(user) {
  const existingUser = await getUser({ email: user.email });
  const inputMsj = [];
  let result = "Success";
  if (existingUser) {
    inputMsj.push(`The email ${existingUser.email} it already exists`);
    result = "Error";
  } else {
    inputMsj.push(`Email ${user.email} successfully registered`);
  }
  return [result, inputMsj];
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
  validateUser(newUser)
    .then((response) => {
      [result, inputMsj] = response;
      if (result == "Success") {
        postUser(newUser)
          .then(async (data) => {
            setDataCookie({ user: data.email, timer: 300000 }); //Cookie de sesion nueva registrada, duración 5 min.
            setTimeout(() => {
              window.location.href = "../login";
            }, 1500),
              Swal.fire({
                position: "center",
                icon: "info",
                title: "Successful registration",
                text: inputMsj,
                showConfirmButton: false,
                allowOutsideClick: false,
              });
          })
          .catch((error) => console.log("Error:" + error));
      } else if (result == "Error") {
        Swal.fire({
          text: inputMsj,
          icon: "error",
          confirmButtonText: "Accept",
        });
        inputEmail.value = "";
        inputEmail.focus();
      }
    })
    .catch((error) => console.log("Error:" + error));
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
