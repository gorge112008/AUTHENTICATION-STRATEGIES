/*LOGIN*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlCook = URLorigin + "/api/",
  Urlsession = URLorigin + "/api/sessions/",
  UrlLogin = URLorigin + "/api/sessions/login";

const form = document.querySelector("form"),
  SignUp = document.querySelector(".btnSignUp"),
  inputUser = document.getElementById("user"),
  inputPassword = document.getElementById("password"),
  userCheckbox = document.getElementById("userCheck"),
  pswCheckbox = document.getElementById("pswCheck"),
  rememberCheckbox = document.getElementById("loginCheck"),
  btnViewPsw = document.getElementById("btnTogglePsw");

/*****************************************************************CLASES*************************************************************/
class LoginUser {
  constructor() {
    this.email = inputUser.value;
    this.password = inputPassword.value;
  }
}

/*********************************************************FUNCIONES*************************************************************/
async function VerificateSession() {
  try {
    let response = await fetch(Urlsession + "session", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      mode: "cors",
    });
    const { msj, confirm, session } = await response.json();
    if (confirm === true) {
      const role = session.user ? "user" : "admin";
      if (role === "admin") {
        sessionStorage.setItem(
          "userSession",
          JSON.stringify({ msj: msj, role: "admin" })
        );
        setTimeout(() => {
          window.location.href = "../products";
        }, 2000),
          Swal.fire({
            position: "center",
            icon: "info",
            title: "ADMIN SESSION ACTIVE",
            text: session.admin.email,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
      } else if (role === "user") {
        sessionStorage.setItem(
          "userSession",
          JSON.stringify({ msj: msj, role: "user" })
        );
        setTimeout(() => {
          window.location.href = "../products";
        }, 2000),
          Swal.fire({
            position: "center",
            icon: "info",
            title: "USER SESSION ACTIVE",
            text: session.user.email,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
      }
    } else if (confirm === false) {
      VerificateCookie();
    }
  } catch (error) {
    console.log(error);
  }
}

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

async function getDataCookie(name) {
  try {
    let response = await fetch(UrlCook + name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
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

async function delDataCookie(name) {
  try {
    await fetch(UrlCook + "delCookie", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(name),
    });
  } catch {
    console.log(Error);
  }
}

async function VerificateCookie() {
  try {
    const cookie = await getDataCookie("getUserCookie");
    if (cookie.email) {
      inputUser.value = cookie.email;
      userCheckbox.setAttribute("checked", "true");
      rememberCheckbox.setAttribute("checked", "true");
      inputPassword.focus();
    } else {
      inputUser.value = "";
      inputUser.focus();
    }
  } catch (error) {
    console.log(error);
  }
}

/*********************************************************EVENTOS*************************************************************/

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = new LoginUser();
  const { status, sessionData } = await startSession(userData);
  const userSession = sessionData.session;
  if (status === 200) {
    sessionStorage.setItem(
      "userSession",
      JSON.stringify({ msj: sessionData.success, role: sessionData.role })
    );
    rememberCheckbox.checked
      ? setDataCookie({ user: userSession.email })
      : setDataCookie({ user: userSession.email, timer: 10000 });
    setTimeout(() => {
      window.location.href = "../products";
    }, 1000),
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful Login",
        text: "Logging in...",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
  } else if (status === 401||404) {
    Swal.fire({
      title: sessionData.error,
      text: "Your credentials entered are incorrect",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Try again",
      denyButtonText: "Sign up",
    }).then((result) => {
      if (result.isConfirmed) {
        userCheckbox.setAttribute("checked", "true");
        pswCheckbox.setAttribute("checked", "true");
        form.reset();
        inputUser.value = userData.email;
      } else if (result.isDenied) {
        window.location.href = "../signup";
      }
    });
  } else if (status === 409) {
    Swal.fire({
      title: sessionData.error,
      text: "Active Session Found",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Sign in with another account",
      denyButtonText: "Register with another account",
    }).then((result) => {
      if (result.isConfirmed) {
        userCheckbox.setAttribute("checked", "true");
        pswCheckbox.setAttribute("checked", "true");
        form.reset();
        inputUser.value = "";
      } else if (result.isDenied) {
        window.location.href = "../signup";
      }
    });
  }
});

SignUp.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "../signup";
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

VerificateSession();
