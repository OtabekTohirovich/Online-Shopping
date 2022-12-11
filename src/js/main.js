import "./style";
import { singIn, singUp } from "../api";
import { SignUp } from "./sign_up";
import { loadToken } from "./home";
document.addEventListener("DOMContentLoaded", async (e) => {
  addEventListener("popstate", (event) => {
    location.reload();
  });
  const page = location.pathname;
  if (page === "/index.html" || page === "/") {
    const smallHeader = document.querySelector(".small__header");
    if (smallHeader) {
      smallHeader.addEventListener("click", ()=>{
        const navSmall = document.querySelector(".nav__smaller");
        navSmall.classList.toggle("hide");
        
      })
      
    }

  }
  if (page === "/sign-up.html" || page === "/sign-up") {
    const formSignUp = document.querySelector(".form__type");
    formSignUp.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new SignUp(
        formSignUp.firstName.value,
        formSignUp.lastName.value,
        formSignUp.email.value,
        formSignUp.password.value
      );
      console.log(formData);
      singUp(formData).then(({ data }) => {
        console.log(data);
        localStorage.token = data.token;
        localStorage.user = JSON.stringify(data.payload.type);
        location.assign("/");
      });
    });
  }

  if (page === "/sign-in.html" || page === "/sign-in") {
    const signInForm = document.querySelector(".signIn_form");
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        email: signInForm.email.value,
        password: signInForm.password.value,
      };
      console.log(formData);
      singIn(formData)
        .then(({ data }) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.user = JSON.stringify(data.payload.type);
          location.assign("/");
        })
        .catch((err) => {
          Toastify({
            text: err.msg,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, red, red)",
            },
            onClick: function () {},
          }).showToast();
          if (err?.path) {
            location.assign(err.path);
          }
        });
    });
  }
  loadToken();
});
