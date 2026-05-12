const product = JSON.parse(sessionStorage.getItem("selectedProduct"));
console.log(product);

// path ===

let pathName = document.getElementById("product-name-path");
pathName.innerHTML = product.name ;

// images ===

let mainImage = document.getElementById("main-img");
let sideImages = document.getElementsByClassName("photo");

mainImage.src = product.image;
for(let i=0 ; i<4 ; i++){
    sideImages[i].src = product.image;
}

// info ===

let productName = document.getElementById("product-title");
productName.innerHTML = product.name ;

let stars = document.getElementsByClassName("stars")[0];
stars.innerHTML = `${renderStars(product.rating)}`


let reviews = document.querySelector(".product-meta span");
reviews.innerHTML = `(${product.reviews} Reviews)` ;

let price = document.getElementById("product-price") ;
price.innerHTML = `$ ${product.newPrice || product.price}.00`;

let colors = document.getElementById("product-colors");
if (product.colors && product.colors.length > 0) {
    colors.innerHTML = product.colors.map(c => `<span class="color" style="background:${c}"></span>`).join('');
}

document.querySelectorAll("#product-colors span").forEach(color => {
    color.onclick = function() {
        document.querySelectorAll("#product-colors span").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
    }
});

document.querySelectorAll(".size-btn").forEach(btn => {
    btn.onclick = function() {
        document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
    }
});

let minusbtn = document.getElementById("qty-minus");
let quantity = document.getElementById("qty-value");
let plusbtn = document.getElementById("qty-plus");

plusbtn.onclick = function(){
    quantity.innerHTML++;
}
minusbtn.onclick = function(){
    if(quantity.innerHTML > 1){
        quantity.innerHTML--;
    }
}

//related=======================================================================

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
            window.location.href = "details.html";
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
                window.location.href = "../login/login.html"; 
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
                window.location.href = "../login/login.html";
            }
        }
    });
});