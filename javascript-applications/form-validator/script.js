//! Selectors
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const phone = document.querySelector("#phone");

//! Events
form.addEventListener("submit", validation);

//! function

//error
function error(input, message) {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}
//success
function success(input) {
    input.className = 'form-control is-valid';
}
// eMail control (true veya false döner)
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(re.test(input.value)) {
        success(input);
    } else {
        error(input, 'hatalı bir mail adresi');
    }
} 

//checkRequired
function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if(input.value === '') {
            error(input, `${input.id} is required.`);
        } else {
            success(input);
        }
    });  
}

//character length
function checkLength(input, min, max){
    if(input.value.length < min){
        error(input, `${input.id} en az ${min} karakter giriniz`);
    }
    else if(input.value.length > max){
        error(input, `${input.id} en fazla ${max} karakter giriniz`);
    }
    else{
        success(input);
    }
}

//check password
function checkpassword(input1, input2){
    if(input1.value === input2.value){
        success(input2);
    }else{
        error(input2, "lütfen password alanıyla aynı değeri giriniz");
    }
}

//check phone
function checkPhone(input){
    let exp = /^\d{10}$/;
    if(!(exp.test(input.value))){
        error(input, "Telefon 10 karakterli olmalıdır.");
    }else{
        success(input);
    }
}

//validation
function validation(e){
    e.preventDefault();
    checkRequired([username,email,password,repassword,phone]);
    checkEmail(email);
    checkLength(username, 7,15);
    checkLength(email, 19,45);
    checkLength(password, 8,16);
    checkLength(repassword, 8,16);
    checkpassword(password, repassword);
    checkPhone(phone);
};