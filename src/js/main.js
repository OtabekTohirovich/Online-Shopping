import "./style";
import { singIn } from "../api";
document.addEventListener("DOMContentLoaded", async (e) => {
  addEventListener("popstate", (event) => {
    location.reload();
  });

  const page = location.pathname;
  if (page === "/index.html" || page === "/") {
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
      singIn(formData).then(({data}) => {
        console.log(data);
        localStorage.token = data.token;
        localStorage.user = JSON.stringify(data.payload.type);
        location.assign("/");
      });
    });
  }
});
