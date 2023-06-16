/*PROFILE*/
/*******************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlLogin = URLorigin + "/api/sessions/";

const btnUnlock = document.querySelector(".btnUnlockData"),
  dataUnlock = document.querySelector(".btnUnlockData b"),
  listField = document.querySelectorAll(".input-field"),
  btnLogout = document.querySelector(".btnLogout"),
  emailLogged = document.querySelector(".nav__container--email-logged u"),
  rolLogged = document.querySelector(".nav__container--email-logged b"),
  inputID = document.getElementById("id"),
  btnViewID = document.getElementById("btnToggleID");

/*****************************************************************FUNCIONES*************************************************************/
async function focusbtn() {
  const buttonsMax = document.querySelectorAll(".div__container--focusBtn a");
  const buttonsMin = document.querySelectorAll(".asideSD__dropdown--contain a");
  buttonsMax.forEach((button) => {
    button.href == window.location.href
      ? button.classList.add("active")
      : button.classList.remove("active");
  });
  buttonsMin.forEach((button) => {
    button.href == window.location.href
      ? button.classList.add("active")
      : button.classList.remove("active");
  });
}

async function logoutSession() {
  try {
    let response = await fetch(UrlLogin + "logout", {
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

/*****************************************************************EVENTOS*************************************************************/
btnViewID.addEventListener("click", function () {
  if (inputID.type === "password") {
    inputID.type = "text";
    btnViewID.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    inputID.type = "password";
    btnViewID.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }
});

btnUnlock.addEventListener("click", function () {
  if (dataUnlock.innerHTML == "UNLOCK DATA") {
    dataUnlock.innerHTML = "LOCK DATA";
    for (let i = 0; i < listField.length; i++) {
      listField[i].classList.add("active");
    }
    btnViewID.classList.remove("hidden");
  } else if (dataUnlock.innerHTML == "LOCK DATA") {
    dataUnlock.innerHTML = "UNLOCK DATA";
    for (let i = 0; i < listField.length; i++) {
      listField[i].classList.remove("active");
    }
    inputID.type = "password";
    btnViewID.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    btnViewID.classList.add("hidden");
  }
});

btnLogout.addEventListener("click", async () => {
  const email = emailLogged.innerHTML;
  const role = rolLogged.innerHTML;
  Swal.fire({
    title: "ARE YOU SURE TO END YOUR SESSION?",
    text: `${role} SESSION: ${email}`,
    icon: "warning",
    showDenyButton: true,
    confirmButtonColor: "#3085d6",
    denyButtonColor: "#d33",
    confirmButtonText: "Yes, close session.",
    denyButtonText: "Not, cancel.",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const msj = await logoutSession();
      if (msj) {
        setTimeout(() => {
          window.location.href = "../login";
        }, 1500),
          Swal.fire({
            position: "center",
            icon: "info",
            title: msj,
            text: "Redirigiendo al login",
            showConfirmButton: false,
            allowOutsideClick: false,
          });
      }
    } else if (result.isDenied) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Session Return Successfully",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  });
});

focusbtn();
