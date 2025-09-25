document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CARGA MODULAR DE HEADER Y FOOTER ---
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                // Volver a ejecutar scripts específicos del componente si es necesario
                if (id === 'header-placeholder') {
                    initializeHeader();
                }
                if (id === 'footer-placeholder') {
                    // Actualizar el año en el footer
                    document.getElementById('year').textContent = new Date().getFullYear();
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');


    // --- 2. LÓGICA DEL HEADER (MENÚ MÓVIL Y SCROLL) ---
    function initializeHeader() {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Cierra el menú móvil al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if(navMenu.classList.contains('active')){
                    navMenu.classList.remove('active');
                }
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    // --- 3. SLIDER AUTOMÁTICO DEL HERO ---
    function createHeroSlider(sliderSelector, slideSelector, intervalTime) {
        const slides = document.querySelectorAll(slideSelector);
        if (slides.length <= 1) return;

        let currentSlide = 0;
        const showSlide = (index) => {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        };
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };
        setInterval(nextSlide, intervalTime);
    }
    createHeroSlider('.hero-slider', '.hero-slider .slide', 6000);


    // --- 4. SLIDER INTERACTIVO DE TESTIMONIOS ---
    function createInteractiveSlider() {
        const slides = document.querySelectorAll('.testimonial-slider-interactive .testimonial');
        const nextBtn = document.querySelector('.slider-btn.next');
        const prevBtn = document.querySelector('.slider-btn.prev');
        if (slides.length <= 1) {
            if(nextBtn) nextBtn.style.display = 'none';
            if(prevBtn) prevBtn.style.display = 'none';
            return;
        };

        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        };

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        // Opcional: auto-play que se detiene con los botones
        let autoPlay = setInterval(() => nextBtn.click(), 7000);
        [nextBtn, prevBtn].forEach(btn => btn.addEventListener('click', () => clearInterval(autoPlay)));
    }
    createInteractiveSlider();


    // --- 5. ANIMACIONES AL HACER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

});