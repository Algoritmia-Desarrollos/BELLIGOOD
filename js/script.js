document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CARGA MODULAR DE HEADER Y FOOTER ---
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (id === 'header-placeholder') initializeHeader();
                if (id === 'footer-placeholder') document.getElementById('year').textContent = new Date().getFullYear();
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
            navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        }
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if(navMenu && navMenu.classList.contains('active')) navMenu.classList.remove('active');
            });
        });
        window.addEventListener('scroll', () => {
            if (header && window.scrollY > 50) {
                header.classList.add('scrolled');
            } else if (header) {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. SLIDER AUTOMÁTICO DEL HERO ---
    if(document.querySelector('.hero-slider')) {
        let heroSlides = document.querySelectorAll('.hero-slider .slide');
        if (heroSlides.length > 1) {
            let currentHeroSlide = 0;
            setInterval(() => {
                currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
                heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === currentHeroSlide));
            }, 6000);
        }
    }

    // --- 4. NUEVO SLIDER DE PORTFOLIO CON AUTOPLAY Y PAGINACIÓN ---
    function initializePortfolioSlider() {
        const sliderWrapper = document.querySelector('.portfolio-slider-wrapper');
        const slider = document.querySelector('.portfolio-slider');
        const pagination = document.querySelector('.portfolio-pagination');
        if (!slider || !pagination) return;
        
        const slides = Array.from(slider.children);
        let currentIndex = 0;
        let autoplayInterval;

        // --- Crear Paginación ---
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('pagination-dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoplay();
            });
            pagination.appendChild(dot);
        });
        const dots = Array.from(pagination.children);

        // --- Funciones del Slider ---
        function getSlidesInView() {
            if (window.innerWidth <= 576) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        function updateSlider() {
            const slideWidth = slider.querySelector('.portfolio-slide').offsetWidth;
            slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            const totalSlides = slides.length;
            const slidesInView = getSlidesInView();
            // Asegurarse de no dejar un espacio en blanco al final
            if (index > totalSlides - slidesInView) {
                index = totalSlides - slidesInView;
            }
            if (index < 0) {
                index = 0;
            }
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            const totalSlides = slides.length;
            const slidesInView = getSlidesInView();
            let nextIndex = currentIndex + 1;
            if (nextIndex > totalSlides - slidesInView) {
                nextIndex = 0; // Vuelve al principio
            }
            goToSlide(nextIndex);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 2500);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // --- Event Listeners ---
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        sliderWrapper.addEventListener('mouseleave', startAutoplay);
        window.addEventListener('resize', () => goToSlide(0)); // Reset en resize

        // --- Iniciar ---
        goToSlide(0);
        startAutoplay();
    }
    initializePortfolioSlider();

    // --- 5. SLIDER INTERACTIVO DE TESTIMONIOS ---
    const testimonialsSlider = document.querySelector('.testimonial-slider-interactive');
    if(testimonialsSlider){
        const slides = testimonialsSlider.querySelectorAll('.testimonial');
        const nextBtn = document.querySelector('.testimonials-wrapper .slider-btn.next');
        const prevBtn = document.querySelector('.testimonials-wrapper .slider-btn.prev');
        if (slides.length > 1) {
            let currentSlide = 0;
            const showSlide = (index) => slides.forEach((s, i) => s.classList.toggle('active', i === index));
            nextBtn.addEventListener('click', () => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); });
            prevBtn.addEventListener('click', () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); });
        } else {
             if(nextBtn) nextBtn.style.display = 'none';
             if(prevBtn) prevBtn.style.display = 'none';
        }
    }

    // --- 6. LÓGICA PARA TABS DE PRECIOS EN PÁGINA DE LÁSER ---
    const pricingTabsContainer = document.querySelector('.pricing-tabs');
    if (pricingTabsContainer) {
        // ... (código existente)
    }

    // --- 7. ANIMACIONES AL HACER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    
    // --- 8. LÓGICA PARA FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // ... (código existente)
    }
});