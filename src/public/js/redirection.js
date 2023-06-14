/*REDIRECTION TO LOGIN*/
let sesioninterval = 0;
let sesint = setInterval(() => {
  sesioninterval++;
  if (sesioninterval == 1) {
    clearInterval(sesint);
    setTimeout(() => {
      window.location.href = "../login";
    }, 1000),
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Redirecting to Login...",
        showConfirmButton: false,
      });
  }
}, 1000);
