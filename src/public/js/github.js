/*REDIRECTION TO PRODUCTS*/
const msj=document.querySelector(".github--msj"),
role=document.querySelector(".github--role");

sessionStorage.setItem(
  "userSession",
  JSON.stringify({ msj: msj.innerHTML, role: role.innerHTML })
);
setTimeout(() => {
  window.location.href = "../products";
}, 3000),
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Successful Github Login",
    text: "Redirecting to Products...",
    showConfirmButton: false,
    allowOutsideClick: false,
  });
