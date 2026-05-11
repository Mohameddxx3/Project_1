const isRoot = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
const base = isRoot ? "" : "../";

// header
fetch(`${base}header/header.html`)
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;

    // خط تحت اسم الصفحه
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("ul li a");
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (currentPage === linkPage) {
            link.classList.add("active");
        }
    });

    // ايقونه البروفايل
    const profileIcon = document.querySelector(".profile-icon a");
    const profilePage = profileIcon.getAttribute("href").split("/").pop();
    if (currentPage === profilePage) {
        profileIcon.classList.add("active");
    }

    // الايقونات متظهرش لو مش مسجل
    if(window.localStorage.getItem("isLoggedIn")=== "true"){
        document.getElementsByClassName("head-icons")[0].style.display = "flex";
    }else{
        document.getElementsByClassName("head-icons")[0].style.display = "none";
    }

    // logOut
    let logout = document.getElementById("logout-btn");
    logout.onclick = function(e){
        e.preventDefault();
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("username");
        window.location.replace("../login/login.html");
    }

    // منيو الفون
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    
    if (hamburger) {
        hamburger.onclick = function () {
            mobileMenu.classList.toggle("open");
        };
    }

    document.getElementsByClassName("favorite-num")[0].innerHTML = sessionStorage.getItem("favoriteCount") || 0;
    document.getElementsByClassName("cart-num")[0].innerHTML = sessionStorage.getItem("cartCount") || 0;
});


//footer
fetch(`${base}footer/footer.html`)
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});
