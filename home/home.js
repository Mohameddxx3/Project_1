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
        productsSlider.innerHTML += `
            <div class="product-card">
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
            </div>
            `;
    });

    //cart , fav
    let favoriteCount = document.getElementsByClassName("favorite-num")[0];
    let cartCount = document.getElementsByClassName("cart-num")[0];

    document.querySelectorAll(".favorite-btn").forEach(btn => {
        btn.onclick = function() {
            favoriteCount.innerHTML++;
        }
    });
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.onclick = function() {
            cartCount.innerHTML++;
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

fetch("home/category.json")
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

fetch("home/month.json")
.then( res=> res.json() )
.then( data=>{
    monthProducts = data;
    let monthSlide = document.getElementsByClassName("month-products")[0];

    monthProducts.forEach((product)=>{
        monthSlide.innerHTML +=`
            <div class="product-card">
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
                </div>
            `
    });
});
