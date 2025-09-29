document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CARGA MODULAR DE HEADER Y FOOTER ---
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (id === 'header-placeholder') initializeHeader();
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // --- 2. LÓGICA DEL HEADER (MENÚ MÓVIL) ---
    function initializeHeader() {
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

    // --- 4. FILTRO DE GALERÍA ---
    function initializePortfolioFilter() {
        const tabs = document.querySelectorAll('.portfolio-tabs .tab-link');
        const items = document.querySelectorAll('.portfolio-grid .portfolio-item');
        
        if (!tabs.length || !items.length) return;

        function showItems(filter) {
            items.forEach(item => {
                const category = item.getAttribute('data-category');
                const isVisible = filter === 'all' || filter === category;
                item.style.display = isVisible ? 'block' : 'none';
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.getAttribute('data-filter');
                showItems(filter);
            });
        });
        
        // Muestra la categoría activa al inicio
        const activeTab = document.querySelector('.portfolio-tabs .tab-link.active');
        if (activeTab) {
            showItems(activeTab.getAttribute('data-filter'));
        }
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
    
    // --- 7. LÓGICA PARA PESTAÑAS DE PRECIOS (LÁSER) ---
    function initializePricingTabs() {
        const tabs = document.querySelectorAll('.pricing-tabs .tab-link');
        const contents = document.querySelectorAll('.pricing-content');

        if (!tabs.length || !contents.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    initializePricingTabs();

    // --- 8. NUEVA LÓGICA PARA FORMULARIO DE CONTACTO A WHATSAPP ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

            // Recoger los valores de los campos
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const telefono = document.getElementById('telefono').value;
            const correo = document.getElementById('correo').value;
            const consulta = document.getElementById('consulta').value;
            
            // Número de teléfono (asegúrate de que tenga el código de país y sin símbolos)
            const whatsappNumber = '34659306394';

            // Crear el mensaje formateado
            const message = `Hola, quisiera hacer una consulta:\n\n*Nombre:* ${nombre} ${apellido}\n*Teléfono:* ${telefono}\n*Correo:* ${correo}\n\n*Consulta:*\n${consulta}`;
            
            // Codificar el mensaje para la URL
            const encodedMessage = encodeURIComponent(message);
            
            // Crear la URL final de WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappURL, '_blank');
        });
    }
});