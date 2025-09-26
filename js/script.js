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

    // --- 4. SLIDER DE PORTFOLIO AHORA MANEJADO POR CSS ---
    // La función initializePortfolioSlider() ha sido eliminada.

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
        const tabs = pricingTabsContainer.querySelectorAll('.tab-link');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = document.getElementById(tab.dataset.target);
                
                document.querySelectorAll('.pricing-content.active').forEach(c => c.classList.remove('active'));
                document.querySelectorAll('.tab-link.active').forEach(t => t.classList.remove('active'));

                target.classList.add('active');
                tab.classList.add('active');
            });
        });
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
        const num1 = Math.ceil(Math.random() * 10);
        const num2 = Math.ceil(Math.random() * 5);
        const question = `${num1} + ${num2}`;
        const answer = num1 + num2;

        document.getElementById('captcha-question').textContent = question;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userAnswer = parseInt(document.getElementById('captcha').value);
            const formMessage = document.getElementById('form-message');

            if(userAnswer === answer) {
                // Aquí iría el código para enviar el formulario (AJAX/Fetch)
                formMessage.textContent = '¡Mensaje enviado correctamente!';
                formMessage.style.color = 'green';
                contactForm.reset(); // Limpia el formulario
            } else {
                formMessage.textContent = 'La suma es incorrecta. Inténtalo de nuevo.';
                formMessage.style.color = 'red';
            }
        });
    }
});