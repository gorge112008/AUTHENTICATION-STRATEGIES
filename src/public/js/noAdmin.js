/*REDIRECTION TO PROFILE*/
let sesioninterval = 0;
let sesint = setInterval(() => {
    sesioninterval++; 
    if (sesioninterval == 1) {
      clearInterval(sesint);
      setTimeout(() => {
        window.location.href = "../profile"; 
      }, 1000),
        Swal.fire({
          position: "center",
          icon: "info",
          title:
            "Redirecting to Profile...",
          showConfirmButton: false,
        });
    }
  }, 1000);
  