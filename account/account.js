// header
fetch("../header/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});

//validation
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email");
let newPassword = document.getElementById("new-password");
let confirmPassword = document.getElementById("confirm-password");
let saveBtn = document.getElementsByClassName("save")[0];

let firstNameError = document.getElementById("first-name-error");
let lastNameError = document.getElementById("last-name-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

function validateName(input, error) {
    let value = input.value;

    if (value.length === 0) {
        error.textContent = "Name is required";
        return false;
    } else if (/[0-9]/.test(value)) {
        error.textContent = "No numbers";
        return false;
    } else if (/[^A-Za-z\u0600-\u06FF\s]/.test(value)) {
        error.textContent = "No symbols";
        return false;
    } else if (!/^[A-Za-z\u0600-\u06FF]{2,}$/.test(value)) {
        error.textContent = "Invalid name";
        return false;
    } else {
        error.textContent = "";
        return true;
    }
}

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
    let value = newPassword.value;
    let confirm = confirmPassword.value;

    if (value.length === 0 && confirm.length === 0) {
        passwordError.textContent = "";
    return true;
    } else if (value.length < 8) {
        passwordError.textContent = "Less than 8";
        return false;
    }else if(confirm != value){
        passwordError.textContent = "Not matching";
        return false;
    }else {
        passwordError.textContent = "";
        return true;
    }
}

newPassword.onkeyup = function() {
    if (confirmPassword.value.length > 0) {
        validatePassword();
    } else if (newPassword.value.length < 8 && newPassword.value.length > 0) {
        passwordError.textContent = "Less than 8";
    } else {
        passwordError.textContent = "";
    }
};

firstName.onkeyup = () => validateName(firstName, firstNameError);
lastName.onkeyup = () => validateName(lastName, lastNameError);
email.onkeyup = validateEmail;
confirmPassword.onkeyup = validatePassword;

let username = localStorage.getItem("username");
if (username) {
    let parts = username.split(" ");
    firstName.value = parts[0] || "";
    lastName.value = parts[1] || "";
}
document.getElementById("user-name").textContent = username ? username : "Guest";

saveBtn.onclick = function (e) {
    if (!validateName(firstName, firstNameError) ||!validateName(lastName, lastNameError)|| !validateEmail() || !validatePassword()) {
        e.preventDefault();
    }
    if(validateName(firstName, firstNameError) && validateName(lastName, lastNameError)){
        localStorage.setItem("username", firstName.value + " " + lastName.value);
        document.getElementById("user-name").textContent = localStorage.getItem("username");
    }
}

document.getElementsByClassName("fa-bars")[0].onclick = function() {
    document.getElementsByClassName("side")[0].classList.toggle("open");
}

//footer
fetch("../footer/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});