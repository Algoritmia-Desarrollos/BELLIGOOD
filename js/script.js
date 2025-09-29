document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CARGA MODULAR DE HEADER Y FOOTER ---
    function loadComponent(id, url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Error loading ${url}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data;
                }
                if (id === 'header-placeholder') {
                    initializeHeader();
                }
            })
            .catch(error => console.error(error));
    }

    // --- 2. LÓGICA DEL HEADER (MENÚ MÓVIL) ---
    function initializeHeader() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        }
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if(navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- 3. SLIDER AUTOMÁTICO DEL HERO ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        let heroSlides = heroSlider.querySelectorAll('.slide');
        if (heroSlides.length > 1) {
            let currentHeroSlide = 0;
            setInterval(() => {
                heroSlides[currentHeroSlide].classList.remove('active');
                currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
                heroSlides[currentHeroSlide].classList.add('active');
            }, 6000);
        }
    }

    // --- 4. FILTRO DE GALERÍA ---
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        const tabs = portfolioSection.querySelectorAll('.portfolio-tabs .tab-link');
        const items = portfolioSection.querySelectorAll('.portfolio-grid .portfolio-item');
        
        if (tabs.length > 0 && items.length > 0) {
            const filterItems = (filter) => {
                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    item.style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
                });
            };

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    filterItems(tab.getAttribute('data-filter'));
                });
            });

            const activeTab = portfolioSection.querySelector('.portfolio-tabs .tab-link.active');
            if (activeTab) {
                filterItems(activeTab.getAttribute('data-filter'));
            }
        }
    }

    // --- 5. SLIDER INTERACTIVO DE TESTIMONIOS ---
    const testimonialsSlider = document.querySelector('.testimonial-slider-interactive');
    if (testimonialsSlider) {
        const slides = testimonialsSlider.querySelectorAll('.testimonial');
        const nextBtn = document.querySelector('.testimonials-wrapper .slider-btn.next');
        const prevBtn = document.querySelector('.testimonials-wrapper .slider-btn.prev');
        if (slides.length > 1 && nextBtn && prevBtn) {
            let currentSlide = 0;
            const showSlide = (index) => slides.forEach((s, i) => s.classList.toggle('active', i === index));
            
            nextBtn.addEventListener('click', () => { 
                currentSlide = (currentSlide + 1) % slides.length; 
                showSlide(currentSlide); 
            });
            prevBtn.addEventListener('click', () => { 
                currentSlide = (currentSlide - 1 + slides.length) % slides.length; 
                showSlide(currentSlide); 
            });
        } else if (nextBtn && prevBtn) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
        }
    }

    // --- 6. ANIMACIONES AL HACER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // --- 7. LÓGICA PARA PESTAÑAS DE PRECIOS (LÁSER) ---
    const pricingSection = document.getElementById('precios');
    if (pricingSection) {
        const pricingTabs = pricingSection.querySelectorAll('.pricing-tabs .tab-link');
        const pricingContents = pricingSection.querySelectorAll('.pricing-content');
        if (pricingTabs.length > 0 && pricingContents.length > 0) {
            pricingTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetId = tab.getAttribute('data-target');
                    pricingTabs.forEach(t => t.classList.remove('active'));
                    pricingContents.forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }
    }

    // --- 8. LÓGICA PARA FORMULARIO DE CONTACTO A WHATSAPP ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const telefono = document.getElementById('telefono').value;
            const correo = document.getElementById('correo').value;
            const consulta = document.getElementById('consulta').value;
            
            const whatsappNumber = '34659306394';

            const message = `Hola, quisiera hacer una consulta:\n\n*Nombre:* ${nombre} ${apellido}\n*Teléfono:* ${telefono}\n*Correo:* ${correo}\n\n*Consulta:*\n${consulta}`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
        });
    }

    // Cargar componentes principales
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});