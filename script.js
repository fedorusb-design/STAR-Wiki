/* ========================================
   MILITARY RP - 3D Parallax Mouse Effect
   Только для фона
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Preloader
    // ========================================
    const preloader = document.getElementById('preloader');
    
    // Скрываем прелоадер после загрузки
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
                // Удаляем прелоадер из DOM после анимации
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }
        }, 2500); // Минимальное время показа прелоадера
    });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Показать/скрыть кнопку при скролле
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Плавный скролл наверх при клике
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const dustContainer = document.querySelector('.dust-container');
    const particles = document.querySelectorAll('.particle');
    const menuToggle = document.getElementById('menu-toggle');
    const submenuLinks = document.querySelectorAll('.submenu-link');

    // Закрытие меню при клике на подпункт (ссылку подменю)
    submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });
    
    // Закрытие меню при клике на затемнённую область (вне контента меню)
    const menuOverlay = document.querySelector('.menu-overlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            const menuContent = document.querySelector('.menu-content');
            // Если клик был на overlay, но не внутри menu-content
            if (!menuContent.contains(e.target)) {
                menuToggle.checked = false;
            }
        });
    }

    // Настройки интенсивности эффекта (только фон)
    const settings = {
        bg: { translateX: 30, translateY: 30 },
        dust: { translateX: 50, translateY: 50 },
        particles: { translateX: 80, translateY: 80 }
    };

    // Плавность анимации
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const ease = 0.05;

    // Функция для плавной интерполяции
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Обработчик движения мыши
    function handleMouseMove(e) {
        const rect = hero.getBoundingClientRect();
        
        // Нормализуем координаты от -1 до 1
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    // Сброс при выходе мыши
    function handleMouseLeave() {
        targetX = 0;
        targetY = 0;
    }

    // Анимационный цикл
    function animate() {
        // Плавная интерполяция
        currentX = lerp(currentX, targetX, ease);
        currentY = lerp(currentY, targetY, ease);

        // Параллакс для фона (движется в противоположную сторону)
        if (heroBg) {
            const translateX = -currentX * settings.bg.translateX;
            const translateY = -currentY * settings.bg.translateY;
            heroBg.style.transform = `
                scale(1.1)
                translateX(${translateX}px)
                translateY(${translateY}px)
            `;
        }

        // Параллакс для пыли
        if (dustContainer) {
            const translateX = currentX * settings.dust.translateX;
            const translateY = currentY * settings.dust.translateY;
            dustContainer.style.transform = `
                translateX(${translateX}px)
                translateY(${translateY}px)
            `;
        }

        // Параллакс для частиц
        particles.forEach((particle, index) => {
            const factor = 1 + (index % 3) * 0.3;
            const translateX = currentX * settings.particles.translateX * factor;
            const translateY = currentY * settings.particles.translateY * factor;
            particle.style.transform = `
                translateX(${translateX}px)
                translateY(${translateY}px)
            `;
        });

        // Динамическое свечение
        if (hero) {
            const lightX = 50 + currentX * 30;
            const lightY = 50 + currentY * 30;
            hero.style.setProperty('--mouse-x', `${lightX}%`);
            hero.style.setProperty('--mouse-y', `${lightY}%`);
        }

        requestAnimationFrame(animate);
    }

    // Инициализация
    if (hero) {
        hero.addEventListener('mousemove', handleMouseMove);
        hero.addEventListener('mouseleave', handleMouseLeave);

        if (heroBg) {
            heroBg.style.transition = 'transform 0.3s ease-out';
        }

        // Запускаем анимацию
        animate();
    }

    // Поддержка тач-устройств (гироскоп)
    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma !== null && e.beta !== null) {
                targetX = Math.max(-1, Math.min(1, e.gamma / 30));
                targetY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
            }
        });
    }

    // ========================================
    // Language Switcher
    // ========================================
    const translations = {
        ru: {
            // Header
            'nav.about': 'О проекте',
            'nav.discord': 'Discord',
            'nav.telegram': 'Telegram',
            
            // Hero
            'hero.title': 'MILITARY RP',
            'hero.subtitle': 'Gorebox Servers',
            'hero.cta': 'Читать правила',
            
            // Rules Navigation
            'rules.nav.title': '📜 Навигация по правилам',
            'rules.nav.subtitle': 'Выберите категорию',
            'rules.general': 'Общие правила',
            'rules.ranks': 'Звания',
            'rules.rp': 'RP правила',
            'rules.combat': 'Боевые правила',
            'rules.vehicles': 'Техника',
            'rules.punishments': 'Наказания',
            
            // About
            'about.title': 'О проекте',
            'about.subtitle': 'Star – Gorebox Servers',
            'about.text': 'Добро пожаловать в Star! Мы создаём сервера в игре Gorebox. Все анонсы новых серверов, обновления и события публикуются в нашем Discord. Присоединяйтесь к сообществу и играйте вместе с нами!',
            
            // Rules Section
            'rules.title': 'Правила сервера',
            'rules.subtitle': 'Ознакомьтесь с правилами перед началом игры',
            'rules.placeholder': 'Контент в разработке...',
            
            // Footer
            'footer.text': '© 2026 <span>Star</span> — Gorebox Servers. Все права защищены.'
        },
        ua: {
            // Header
            'nav.about': 'Про проект',
            'nav.discord': 'Discord',
            'nav.telegram': 'Telegram',
            
            // Hero
            'hero.title': 'MILITARY RP',
            'hero.subtitle': 'Gorebox Servers',
            'hero.cta': 'Читати правила',
            
            // Rules Navigation
            'rules.nav.title': '📜 Навігація по правилах',
            'rules.nav.subtitle': 'Оберіть категорію',
            'rules.general': 'Загальні правила',
            'rules.ranks': 'Звання',
            'rules.rp': 'RP правила',
            'rules.combat': 'Бойові правила',
            'rules.vehicles': 'Техніка',
            'rules.punishments': 'Покарання',
            
            // About
            'about.title': 'Про проект',
            'about.subtitle': 'Star – Gorebox Servers',
            'about.text': 'Ласкаво просимо до Star! Ми створюємо сервери в грі Gorebox. Всі анонси нових серверів, оновлення та події публікуються в нашому Discord. Приєднуйтесь до спільноти та грайте разом з нами!',
            
            // Rules Section
            'rules.title': 'Правила сервера',
            'rules.subtitle': 'Ознайомтеся з правилами перед початком гри',
            'rules.placeholder': 'Контент в розробці...',
            
            // Footer
            'footer.text': '© 2026 <span>Star</span> — Gorebox Servers. Усі права захищені.'
        },
        en: {
            // Header
            'nav.about': 'About',
            'nav.discord': 'Discord',
            'nav.telegram': 'Telegram',
            
            // Hero
            'hero.title': 'MILITARY RP',
            'hero.subtitle': 'Gorebox Servers',
            'hero.cta': 'Read Rules',
            
            // Rules Navigation
            'rules.nav.title': '📜 Rules Navigation',
            'rules.nav.subtitle': 'Select a category',
            'rules.general': 'General Rules',
            'rules.ranks': 'Ranks',
            'rules.rp': 'RP Rules',
            'rules.combat': 'Combat Rules',
            'rules.vehicles': 'Vehicles',
            'rules.punishments': 'Punishments',
            
            // About
            'about.title': 'About',
            'about.subtitle': 'Star – Gorebox Servers',
            'about.text': 'Welcome to Star! We create servers in Gorebox game. All announcements for new servers, updates and events are posted on our Discord. Join the community and play with us!',
            
            // Rules Section
            'rules.title': 'Server Rules',
            'rules.subtitle': 'Please read the rules before playing',
            'rules.placeholder': 'Content in development...',
            
            // Footer
            'footer.text': '© 2026 <span>Star</span> — Gorebox Servers. All rights reserved.'
        }
    };

    const langNames = {
        ru: 'RU',
        ua: 'UA',
        en: 'EN'
    };

    // Получаем сохранённый язык или используем русский по умолчанию
    let currentLang = localStorage.getItem('language') || 'ru';

    // Функция для перевода страницы
    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Обновляем текущий язык в кнопке
        const langCurrent = document.querySelector('.lang-current');
        if (langCurrent) {
            langCurrent.textContent = langNames[lang];
        }

        // Обновляем активный класс в dropdown
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Сохраняем выбор
        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    // Обработчики для переключения языка
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            if (lang) {
                translatePage(lang);
            }
        });
    });

    // Применяем сохранённый язык при загрузке
    translatePage(currentLang);
});
