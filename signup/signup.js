// header
fetch("../header/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});

// body
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let signUp = document.getElementsByTagName("button")[0];

let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

function validateName() {
    let value = name.value;

    if (value.length === 0) {
        nameError.textContent = "Name is required";
        return false;
    } else if (/[0-9]/.test(value)) {
        nameError.textContent = "No numbers";
        return false;
    } else if (/[^A-Za-z\u0600-\u06FF\s]/.test(value)) {
        nameError.textContent = "No symbols";
        return false;
    } else if (!/^[A-Za-z\u0600-\u06FF]{2,}\s+[A-Za-z\u0600-\u06FF]{2,}$/.test(value)) {
        nameError.textContent = "Write full name";
        return false;
    } else {
        nameError.textContent = "";
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

name.onkeyup = validateName;
email.onkeyup = validateEmail;
password.onkeyup = validatePassword;

signUp.onclick = function (e) {
    e.preventDefault();
    if (validateName() && validateEmail() && validatePassword()) {
        localStorage.setItem("username", name.value);
        window.location.replace("../login/login.html");
    }
}

//footer
fetch("../footer/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});
