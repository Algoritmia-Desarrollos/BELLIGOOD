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

    // --- 4. FILTRO DE GALERÍA CON "VER MÁS" ---
    function initializePortfolioFilter() {
        const tabs = document.querySelectorAll('.portfolio-tabs .tab-link');
        const items = document.querySelectorAll('.portfolio-grid .portfolio-item');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const itemsToShow = 6;

        if (!tabs.length || !items.length || !loadMoreBtn) return;

        // Función para mostrar items y gestionar el botón
        function showItems(filter = 'all') {
            const filteredItems = [];
            
            // Ocultar todos los items primero
            items.forEach(item => {
                item.classList.add('hidden');
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    filteredItems.push(item);
                }
            });

            // Mostrar los primeros 6 (o menos)
            filteredItems.slice(0, itemsToShow).forEach(item => {
                item.classList.remove('hidden');
            });

            // Gestionar visibilidad del botón "Ver Más"
            if (filter === 'all' && filteredItems.length > itemsToShow) {
                loadMoreBtn.classList.remove('hidden');
            } else {
                loadMoreBtn.classList.add('hidden');
            }
            
            // Si el filtro no es 'all', mostrar todos los items de esa categoría
            if (filter !== 'all') {
                 filteredItems.forEach(item => item.classList.remove('hidden'));
            }
        }

        // Event listener para las pestañas
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.getAttribute('data-filter');
                showItems(filter);
            });
        });

        // Event listener para el botón "Ver Más"
        loadMoreBtn.addEventListener('click', () => {
            items.forEach(item => {
                if(item.getAttribute('data-category')) { // Asegura que solo se muestren los items de la galería
                    item.classList.remove('hidden');
                }
            });
            loadMoreBtn.classList.add('hidden');
        });

        // Estado inicial al cargar la página
        showItems('all');
    }
    initializePortfolioFilter();


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

    // --- 6. ANIMACIONES AL HACER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    
    // --- 7. LÓGICA PARA FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // ... (código existente, no se muestra por brevedad)
    }
});