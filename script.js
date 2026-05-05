document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Handle (Premium submission state)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capturar dados
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'REDIRECIONANDO...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Criar mensagem para o WhatsApp
            const message = `Olá, meu nome é ${name}.%0A%0A*E-mail:* ${email}%0A*Assunto:* ${subject}`;
            const whatsappUrl = `https://wa.me/5511982501225?text=${message}`;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                
                submitBtn.innerText = 'SOLICITAÇÃO ENVIADA';
                submitBtn.style.background = '#28a745';
                submitBtn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1000);
        });
    }
    // Swiper Initialization - Coverflow Effect
    const servicesSwiper = new Swiper('.services-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 20,
            stretch: -20,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        loopedSlides: 4,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Promo Popup Logic
    const promoPopup = document.getElementById('promo-popup');
    const closePopup = document.querySelector('.close-popup');

    if (promoPopup) {
        // Mostrar o popup após 1.5 segundos
        setTimeout(() => {
            promoPopup.classList.add('active');
        }, 1500);

        // Fechar no botão X
        closePopup.addEventListener('click', () => {
            promoPopup.classList.remove('active');
        });

        // Fechar ao clicar fora do conteúdo
        promoPopup.addEventListener('click', (e) => {
            if (e.target === promoPopup) {
                promoPopup.classList.remove('active');
            }
        });
    }
});
