/*REDIRECTION TO PRODUCTS*/
const gitMsj = document.querySelector(".github--msj"),
  gitRole = document.querySelector(".github--role");

const msj = gitMsj.innerHTML,
  role = gitRole.innerHTML;

async function initGitHub() {
  sessionStorage.setItem(
    "userSession",
    JSON.stringify({ msj: msj, role: role })
  );
  setTimeout(() => {
    window.location.href = "../products";
  }, 2000),
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successful Github Login",
      text: "Redirecting to Products...",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
}

initGitHub();