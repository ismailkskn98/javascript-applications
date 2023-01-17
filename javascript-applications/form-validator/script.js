//! Selectors
const form = document.querySelector("#form");
const userName = document.querySelector("#username");
const eMail = document.querySelector("#email");
const password = document.querySelector("#password");
const rePassword = document.querySelector("#repassword");

//! Events
form.addEventListener("submit", validation);

//! function

//error
function error(input, message){
    input.classList.add("is-invalid");
    input.nextElementSibling.innerHTML = "Lütfen en az 7 karakter giriniz";
    const div = input.nextElementSibling;
    div.innerText = message;
    div.classList.add("invalid-feedback");
}
//success
function success(input){
    input.classList.add("is-valid");
}
// eMail control (true veya false döner)
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
//validation (controls)
function validation(e){
    e.preventDefault();

    // username
    if(userName.value.trim() == ""){
        // invalid (geçersiz)
        error(userName, "Lütfen en az 7 karakter giriniz");
    }else{
        // valid (geçerli)
        success(userName);
    }

    // eMail
    if(eMail.value.trim() == ""){
        // invalid (geçersiz)
        error(eMail, "Lütfen mail adresinizi istenen şekilde doldurunuz");
    }
    else if (!(validateEmail(eMail.value))){
        error(eMail, "Düzgün bir mail adresi giriniz");
    }
    else{
        // valid (geçerli)
        success(eMail);
    }

    // password
    if(password.value.trim() == ""){
        // invalid (geçersiz)
        error(password, "Lütfen en az 8 karakterli bir şifre belirleyiniz");
    }else{
        // valid (geçerli)
        success(password);
    }

    // rePassword
    if(rePassword.value.trim() == ""){
        // invalid (geçersiz)
        error(rePassword, "Belirlediğiniz şifreyle uyuşmuyor");
    }else{
        // valid (geçerli)
        success(rePassword);
    }

}

