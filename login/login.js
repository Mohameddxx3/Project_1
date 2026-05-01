// header
fetch("../header/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});

// body
let email = document.getElementById("email");
let password = document.getElementById("password");
let LogIn = document.getElementsByTagName("button")[0];

let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let submitError = document.getElementById("submit-error");

function validateEmail() {
    let value = email.value;

    if (value.length == 0) {
        emailError.textContent = "Email is required";
        return false;
    }
    if (/[ء-ي]/.test(value)) {
        emailError.textContent = "Arabic not allowed";
        return false;
    }

    if(/^[0-9]+$/.test(value)){
        if (!value.startsWith("01") || value.length !== 11) {
            emailError.textContent = "Invalid number";
            return false;
        }
        emailError.textContent = "";
        return true;
    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        emailError.textContent = "Invalid email";
        return false;
    }
    emailError.textContent = "";
    return true;
}
function validatePassword() {
    let value = password.value;

    if (value.length == 0) {
        passwordError.textContent = "Password is required";
        return false;
    } else if (value.length < 8) {
        passwordError.textContent = "Less than 8";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

email.onkeyup = validateEmail;
password.onkeyup = validatePassword;

LogIn.onclick = function (e){
    e.preventDefault();
    if (!validateEmail() || !validatePassword()){
        submitError.textContent = "Incorrect data";
    }
    else{
        localStorage.setItem("isLoggedIn", "true");
        window.location.replace("../index.html");
    }
}

//footer
fetch("../footer/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});
