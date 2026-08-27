document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    /* ---------- Header fixo com fundo sólido ao rolar ---------- */
    const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Menu hambúrguer (mobile) ---------- */
    const openMenu = () => {
        navMenu.classList.add('is-open');
        navToggle.classList.add('is-open');
        navOverlay.classList.add('is-visible');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Fechar menu');
    };

    const closeMenu = () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navOverlay.classList.remove('is-visible');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('is-open');
        isOpen ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* Fecha o menu se a tela for redimensionada para desktop */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    /* ---------- Realce do link ativo enquanto rola a página ---------- */
    const sections = document.querySelectorAll('main section[id]');

    if (sections.length && navLinks.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    /* ---------- Revela elementos (ex: secção Sobre) ao entrarem na tela ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealEls.forEach(el => revealObserver.observe(el));
    }

});