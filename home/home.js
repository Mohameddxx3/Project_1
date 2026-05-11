// hero =====================================================================================
let currentSlide = 0;
let slides = [];
let autoSlide;

fetch("https://69fd0c0f30ad0a6fd1c070fc.mockapi.io/id")
    .then(res => res.json())
    .then(data => {
        slides = data;
        const slider = document.getElementById("hero-slider");
        const dotsContainer = document.getElementById("hero-dots");

        slides.forEach((slide, index) => {
            // Slide
            slider.innerHTML += `
                <div class="hero-slide">
                <div class="hero-slide-content">
                    <p class="brand">${slide.brand}</p>
                    <h2>${slide.title}</h2>
                    <a href="${slide.btnLink}">${slide.btnText} <i class="fas fa-arrow-right"></i></a>
                </div>
                <img src="${slide.image}" alt="${slide.brand}">
                </div>
                `;

            // Dot
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.onclick = () => goTo(index);
            dotsContainer.appendChild(dot);
        });

        startAuto();
    });

function goTo(index) {
    const slider = document.getElementById("hero-slider");
    const dots = document.querySelectorAll(".hero-dots .dot");

    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    dots[currentSlide].classList.add("active");

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAuto() {
    autoSlide = setInterval(() => {
        const next = (currentSlide + 1) % slides.length;
        goTo(next);
    }, 3000);
}

// today =====================================================================================
let products = [];

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

fetch("https://69fd0c0f30ad0a6fd1c070fc.mockapi.io/todayProduct")
.then( res=>res.json() )
.then( data=>{
    products = data ;
    let productsSlider = document.getElementsByClassName("products-slider")[0];

    
    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML += `
            <div class="product-image">
                <img src="${product.image}">
                <div class="icon">
                    <span class="discount">-${product.discount}%</span>
                    <div class="product-icon">
                        <button class="favorite-btn"><i class="fa-regular fa-heart"></i></button>
                        <button class="view-btn"><i class="fa-regular fa-eye"></i></button>
                    </div>
                </div>
                <button class="add-to-cart">Add To Cart</button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">
                    <span class="now">$${product.newPrice}</span>
                    <span class="before">$${product.oldPrice}</span>
                </div>
                <div class="rate">
                    ${renderStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
            </div>
        `;

        // view
        card.querySelector(".view-btn").onclick = function() {
            sessionStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "details/details.html";
        }

        productsSlider.appendChild(card);
    
    });

    //cart , fav
    
    document.querySelectorAll(".favorite-btn").forEach(btn => {
        btn.onclick = function() {
            let favoriteCount = document.getElementsByClassName("favorite-num")[0];
            if(window.localStorage.getItem("isLoggedIn")){
                const icon = this.querySelector("i");
                
                let favCount = parseInt(sessionStorage.getItem("favoriteCount")) || 0;
                if (icon.classList.contains("fa-regular")) {
                    favCount++;
                } else {
                    favCount--;
                }

                sessionStorage.setItem("favoriteCount", favCount);
                favoriteCount.innerHTML = favCount;
                    
                icon.classList.toggle("fa-regular");
                icon.classList.toggle("fa-solid");
                
            }else{
                window.location.href = "login/login.html";
            }
        }
    });
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.onclick = function() {
            let cartCount = document.getElementsByClassName("cart-num")[0];
            if(window.localStorage.getItem("isLoggedIn")){
                let crtCount = parseInt(sessionStorage.getItem("cartCount")) || 0;
                crtCount++;

                sessionStorage.setItem("cartCount", crtCount);
                cartCount.innerHTML = crtCount;
            }else{
                window.location.href = "login/login.html";
            }
        }
    });
});

let prevButton = document.getElementsByClassName("prev")[0];
let nextButton = document.getElementsByClassName("next")[0];

let slideNum = 0;

function getVisible() {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    return 4;
}

const cardWidth = () => {
    const card = document.querySelector(".product-card");
    return card ? card.offsetWidth + 20 : 0;
};

nextButton.onclick = function(){
    let productsSlider = document.getElementsByClassName("products-slider")[0];
    
    if (slideNum < products.length - getVisible()) {
        slideNum++;
        productsSlider.style.transform = `translateX(-${slideNum * cardWidth()}px)`
    }
}
prevButton.onclick = function(){
    let productsSlider = document.getElementsByClassName("products-slider")[0];
    
    if (slideNum > 0) {
        slideNum--;
        productsSlider.style.transform = `translateX(-${slideNum * cardWidth()}px)`
    }
}

// time

let days = document.getElementById("days");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

function pad(num) {
    return num.toString().padStart(2, "0");
}

// let endTime = localStorage.getItem("countdownEnd");

// if (!endTime) {
    //     endTime = Date.now() + 4 * 24 * 60 * 60 * 1000;
    //     localStorage.setItem("countdownEnd", endTime);
// }

let totalSeconds = 4 * 24 * 60 * 60;

setInterval(function() {
    // let totalSeconds = Math.floor((endTime - Date.now()) / 1000);
    if (totalSeconds <= 0) return;

    totalSeconds--;

    let d = Math.floor(totalSeconds / (24 * 60 * 60));
    let h = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    let m = Math.floor((totalSeconds % (60 * 60)) / 60);
    let s = totalSeconds % 60;

    days.innerHTML = pad(d);
    hours.innerHTML = pad(h);
    minutes.innerHTML = pad(m);
    seconds.innerHTML = pad(s);
}, 1000);



// category ====================================================================================

let categories = []

fetch("home/json/category.json")
.then( res=> res.json() )
.then( data=>{
    categories = data;
    let categoriesSlider = document.getElementsByClassName("categories-slider")[0];

    categories.forEach((category)=>{
        categoriesSlider.innerHTML += `
        <div class="category-card">
            <i class="fa-solid ${category.icon}"></i>
            <p>${category.name}</p>
        </div>
        `
    })
} )

let prevButtonC = document.getElementsByClassName("prev")[1];
let nextButtonC = document.getElementsByClassName("next")[1];

let slideNumC = 0;

function getVisibleC() {
    if (window.innerWidth < 576) return 2;
    if (window.innerWidth < 992) return 4;
    return 6;
}

const cardWidthC = () => {
    const card = document.querySelector(".category-card");
    return card ? card.offsetWidth + 20 : 0;
};

nextButtonC.onclick = function(){
    let categoriesSlider = document.getElementsByClassName("categories-slider")[0];
    
    if (slideNumC < categories.length - getVisibleC()) {
        slideNumC++;
        categoriesSlider.style.transform = `translateX(-${slideNumC * cardWidthC()}px)`
    }
}
prevButtonC.onclick = function(){
    let categoriesSlider = document.getElementsByClassName("categories-slider")[0];
    
    if (slideNumC > 0) {
        slideNumC--;
        categoriesSlider.style.transform = `translateX(-${slideNumC * cardWidthC()}px)`
    }
}

// month ====================================================================================

let monthProducts = [];

fetch("home/json/month.json")
.then( res=> res.json() )
.then( data=>{
    monthProducts = data;
    let monthSlide = document.getElementsByClassName("month-products")[0];

    monthProducts.forEach((product)=>{
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML +=`
            <div class="product-image">
                <img src="${product.image}">
                <div class="icon">
                    <div class="product-icon">
                        <button class="favorite-btn"><i class="fa-regular fa-heart"></i></button>
                        <button class="view-btn"><i class="fa-regular fa-eye"></i></button>
                    </div>
                </div>
                <button class="add-to-cart">Add To Cart</button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">
                    <span class="now">$${product.newPrice}</span>
                    <span class="before">${product.oldPrice > 0 ? '$' + product.oldPrice : ''}</span>
                </div>
                <div class="rate">
                    ${renderStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
            </div>
        `

        // view
        card.querySelector(".view-btn").onclick = function() {
            sessionStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "details/details.html";
        }
        
        monthSlide.appendChild(card);
    });
});

// banner ====================================================================================

// let bannerEndTime = localStorage.getItem("bannerCountdownEnd");

// if (!bannerEndTime) {
//     bannerEndTime = Date.now() + 1 * 24 * 60 * 60 * 1000;
//     localStorage.setItem("bannerCountdownEnd", bannerEndTime);
// }

const bHours = document.getElementById("hoursb");
const bDays = document.getElementById("daysb");
const bMinutes = document.getElementById("minutesb");
const bSeconds = document.getElementById("secondsb");

let totalSecondsb = 4 * 24 * 60 * 60;

setInterval(function () {
    // let totalSeconds = Math.floor((bannerEndTime - Date.now()) / 1000);

    if (totalSecondsb <= 0) return;

    totalSecondsb--;

    let d = Math.floor(totalSecondsb / (24 * 60 * 60));
    let h = Math.floor((totalSecondsb % (24 * 60 * 60)) / (60 * 60));
    let m = Math.floor((totalSecondsb % (60 * 60)) / 60);
    let s = totalSecondsb % 60;

    bDays.innerHTML = pad(d);
    bHours.innerHTML = pad(h);
    bMinutes.innerHTML = pad(m);
    bSeconds.innerHTML = pad(s);
}, 1000);


// products ====================================================================================
let exploreProducts = [];
let exploreSlideNum = 0;
const perPage = 8;

fetch("home/json/products.json")
.then( res=>res.json() )
.then( data=>{
    exploreProducts = data ;
    const productsSlider = document.querySelector("#products .products-slider");

    for (let i = 0; i < exploreProducts.length; i += perPage) {
        const page = exploreProducts.slice(i, i + perPage);
        
        let slidePage = document.createElement("div");
        slidePage.classList.add("slide-page");

        page.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML += `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="icon">
                    ${product.isNew ? '<span class="new-badge">NEW</span>' : ''}
                    <div class="product-icon">
                        <button class="favorite-btn"><i class="fa-regular fa-heart"></i></button>
                        <button class="view-btn"><i class="fa-regular fa-eye"></i></button>
                    </div>
                </div>
                <button class="add-to-cart">Add To Cart</button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="details">
                    <div class="price">
                        <span class="now">$${product.price}</span>
                    </div>
                    <div class="rate">
                        ${renderStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                </div>
                ${product.colors.length > 0 ? `
                    <div class="colors">
                        ${product.colors.map(c => `<span class="color" style="background:${c}"></span>`).join('')}
                    </div>` : ''}
            </div>
            `;

            // view
            card.querySelector(".view-btn").onclick = function() {
                sessionStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "details/details.html";
            }

            slidePage.appendChild(card);

        });

        productsSlider.appendChild(slidePage);
    }

    document.querySelectorAll(".color").forEach(color => {
    color.onclick = function() {
        this.closest(".colors").querySelectorAll(".color").forEach(c => c.classList.remove("active"));
        this.classList.add("active");
    }
});

    const nextBtn = document.querySelectorAll(".arrow-btn.next")[2];
    const prevBtn = document.querySelectorAll(".arrow-btn.prev")[2];
    const totalPages = Math.ceil(exploreProducts.length / perPage);

    nextBtn.onclick = function () {
        if (exploreSlideNum < totalPages - 1) {
            exploreSlideNum++;
            productsSlider.style.transform = `translateX(-${exploreSlideNum * 100}%)`;
        }
    };

    prevBtn.onclick = function () {
        if (exploreSlideNum > 0) {
            exploreSlideNum--;
            productsSlider.style.transform = `translateX(-${exploreSlideNum * 100}%)`;
        }
    };
});
