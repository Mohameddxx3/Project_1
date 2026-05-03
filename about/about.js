// header
fetch("../header/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});

//slider
const slider = document.querySelector(".team-slider");
const dots = document.querySelectorAll(".slider .dot");
const cards = document.querySelectorAll(".team-card");
let current = 0;

function getVisible() {
    if (window.innerWidth < 992) return 1;
    if (window.innerWidth < 1200) return 2;
    return 3;
}

function goTo(index) {
    dots[current].classList.remove("active");

    current = index;

    dots[current].classList.add("active");

    const visible = getVisible();
    const moveBy = visible * current;
    const cardWidth = cards[0].offsetWidth + 20;

    slider.style.transform = `translateX(-${moveBy * cardWidth}px)`;
}

dots.forEach((dot, index) => {
    dot.onclick = () => goTo(index);
});


//footer
fetch("../footer/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});