// hero 
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
    }, 5000);
}