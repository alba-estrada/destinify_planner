/* MENÚ */
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const dropdownMenu = document.querySelector('.menu');
const loginButton = document.querySelector('.btn--blue');
const logotipo = document.querySelector('.logotipo');
const sliderDots = document.querySelector('.slider__dots');
const body = document.body;

menuIcon.addEventListener('click', () => {
    dropdownMenu.classList.add('show');
    closeIcon.style.display = 'block';
    loginButton.style.display = 'block';
    logotipo.style.display = 'block';
    sliderDots.style.display = 'none';
    body.classList.add('noscroll'); // Deshabilitar el scroll al abrir el menú
});

closeIcon.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    closeIcon.style.display = 'none';
    loginButton.style.display = 'block';
    logotipo.style.display = 'block';
    sliderDots.style.display = 'flex';
    body.classList.remove('noscroll'); // Habilitar el scroll al cerrar el menú
});


/* SLIDER */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slider--dot");
const slideInterval = 8000;
let currentSlide = 0;
let slideTimer;

// Ir a un slide específico
function goToSlide(n) {
    slides[currentSlide].classList.remove("slide--active");
    dots[currentSlide].classList.remove("active");
    currentSlide = n;
    slides[currentSlide].classList.add("slide--active");
    dots[currentSlide].classList.add("active");
}

// Cambiar slide manualmente
function nextSlide() {
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextSlideIndex);
}

// Temporizador automático
function startSlideTimer() {
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Finalizar temporizador automático
function stopSlideTimer() {
    clearInterval(slideTimer);
}

startSlideTimer();

// Cambiar con los puntos de navegación
dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
        if (index !== currentSlide) {
            stopSlideTimer();
            goToSlide(index);
            startSlideTimer();
        }
    });
});

// Primer punto siempre activo
if (dots.length > 0) {
    dots[0].classList.add("active");
}

/* APPEAR */
let appearElements = document.querySelectorAll('.appear');

function handleScroll() {
    appearElements.forEach((appear) => {
        if (appear.getBoundingClientRect().top < window.innerHeight - 100) {
            appear.style.opacity = '1';
        } else {
            appear.style.opacity = '0'; // Restaurar la opacidad inicial si el elemento sale del viewport
        }
    });
}

window.addEventListener('scroll', handleScroll);


/* CARRUSEL */
let items = document.querySelectorAll(".destinations__item");
let dotsCarrusel = document.querySelectorAll(".carrusel--dot");
let currentCarrusel = 1;
const totalItems = 3;

dotsCarrusel.forEach(dot => {
    dot.addEventListener("click", function () {
        dotsCarrusel.forEach(dot => dot.classList.remove("active"));
        this.classList.add("active");
        const carruselNumber = parseInt(this.getAttribute("data-carrusel"));
        showCarrusel(carruselNumber);
    });
});

function showCarrusel(carruselNumber) {
    items.forEach(item => {
        item.classList.add("hidden");
    });

    let start = (carruselNumber - 1) * totalItems;
    let end = start + totalItems;
    for (let i = start; i < end; i++) {
        if (items[i]) {
            items[i].classList.remove("hidden");
        }
    }
    currentCarrusel = carruselNumber;
}

if (dotsCarrusel.length > 0) {
    dotsCarrusel[0].classList.add("active");
}


// Botón cargar más 
document.addEventListener('click', (event) => {
    if (event.target.matches('#loadMoreBtn')) {
        const hiddenItems = document.querySelectorAll('.destinations__item.hidden');
        hiddenItems.forEach(item => {
            item.classList.remove('hidden');
        });
        event.target.style.display = 'none';
    }
});



