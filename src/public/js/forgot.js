/*LOGIN*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlCook = URLorigin + "/api/",
  UrlSession = URLorigin + "/sessions/";

const form = document.querySelector("form"),
  Login = document.querySelector(".btnLogin"),
  inputUser = document.getElementById("user"),
  inputPassword = document.getElementById("password"),
  inputPasswordRep = document.getElementById("passwordRep"),
  btnViewPsw = document.getElementById("btnTogglePsw"),
  btnViewPswRep = document.getElementById("btnTogglePswRep");

/*********************************************************FUNCIONES*************************************************************/
async function sendRecovery(data) {
  try {
    let response = await fetch(UrlSession + "forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, recoveryData: dataRes };
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

/*********************************************************EVENTOS*************************************************************/

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const recoveryValues = {
    User: inputUser.value,
    Password: inputPassword.value,
    repeatPassword: inputPasswordRep.value,
  };
  const { status, recoveryData } = await sendRecovery(recoveryValues);
  if (status === 200) {
    setDataCookie({ user: recoveryValues.User, timer: 300000 }); //Cookie de sesion nueva registrada, duración 5 min.
    setTimeout(() => {
      window.location.href = "../login";
    }, 1000),
      Swal.fire({
        position: "center",
        title: recoveryData.msj,
        text: "Updated Password",
        icon: "success",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
  } else if (status === 400) {
    Swal.fire({
      title: recoveryData.error,
      text: "Check your passwords please",
      icon: "error",
      confirmButtonText: "Accept",
    });
  }else if (status === 404) {
    Swal.fire({
        title: recoveryData.error,
        text: "Your credentials entered are incorrect",
        icon: "error",
        showDenyButton: true,
        confirmButtonText: "Try again",
        denyButtonText: "Sign up",
      }).then((result) => {
        if (result.isConfirmed) {
          form.reset();
          inputUser.value = recoveryValues.User;
        } else if (result.isDenied) {
          window.location.href = "../signup";
        }
      });
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

btnViewPswRep.addEventListener("click", function () {
  if (inputPasswordRep.type === "password") {
    inputPasswordRep.type = "text";
    btnViewPswRep.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    inputPasswordRep.type = "password";
    btnViewPswRep.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }
});
