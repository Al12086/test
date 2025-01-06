// Добавляем плавное появление элементов при скролле
document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .section-title, .footer-section').forEach(el => {
        el.classList.add('animate-hidden');
        observer.observe(el);
    });

    // Эффект печатающегося текста для hero секции
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let charIndex = 0;
    function typeText() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }
    
    setTimeout(typeText, 500);

    // Анимированные счетчики статистики
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Закрываем мобильное меню при клике на ссылку
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Parallax эффект для hero секции
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Анимация при наведении на проекты
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const overlay = card.querySelector('.project-overlay');
            overlay.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', (e) => {
            const overlay = card.querySelector('.project-overlay');
            overlay.style.transform = 'translateY(100%)';
        });
    });
});