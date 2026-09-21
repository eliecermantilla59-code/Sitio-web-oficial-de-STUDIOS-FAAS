(function () {
    'use strict';

    /* === NAVBAR TOGGLE (mobile) === */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-container')) {
                navLinks.classList.remove('active');
            }
        });
    }

    /* === CLOSE NAV ON LINK CLICK (mobile) === */
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    /* === NAVBAR SCROLL EFFECT === */
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    /* === SCROLL TO TOP BUTTON === */
    var scrollBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* === INTERSECTION OBSERVER — TIMELINE ANIMATION === */
    var timelineItems = document.querySelectorAll('.timeline-item');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        timelineItems.forEach(function (item) {
            item.classList.add('visible');
        });
    }

    /* === SMOOTH SCROLL FOR ANCHOR LINKS (fallback for older browsers) === */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = navbar ? navbar.offsetHeight : 0;
                var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    /* === DYNASTY CARDS — STAGGERED HOVER TITLE SHIMMER === */
    var dynastyHeaders = document.querySelectorAll('.dynasty-header');

    dynastyHeaders.forEach(function (header) {
        header.addEventListener('mouseenter', function () {
            var title = this.querySelector('h3');
            if (title) {
                title.style.transition = 'letter-spacing 0.4s ease';
                title.style.letterSpacing = '10px';
                setTimeout(function () {
                    title.style.letterSpacing = '6px';
                }, 400);
            }
        });
    });

    /* === TYPE CARDS — ADD TILT EFFECT ON MOUSE MOVE (desktop) === */
    var typeCards = document.querySelectorAll('.type-card');

    typeCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / centerY * -6;
            var rotateY = (x - centerX) / centerX * 6;

            card.style.transform =
                'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(function () {
                card.style.transition = '';
            }, 500);
        });
    });

    /* === GALLERY — CLICK TO SHOW PIECE INFO === */
    var galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var era = this.querySelector('.gallery-era');
            var piece = this.querySelector('.gallery-piece');
            var overlay = this.querySelector('.gallery-overlay');

            if (era && piece && overlay) {
                var msg = era.textContent + ': ' + piece.textContent;
                overlay.style.outline = '3px solid var(--gold)';
                overlay.style.outlineOffset = '4px';
                overlay.style.borderRadius = 'var(--radius)';
                setTimeout(function () {
                    overlay.style.outline = 'none';
                    overlay.style.outlineOffset = '0';
                }, 1500);
            }
        });
    });

    /* === COUNTER ANIMATION FOR STATS === */
    function animateCounters() {
        var stats = document.querySelectorAll('.stat-num');
        stats.forEach(function (stat) {
            var text = stat.textContent;
            var hasPlus = text.indexOf('+') !== -1;
            var hasTilde = text.indexOf('~') !== -1;
            var numStr = text.replace(/[~,+]/g, '');
            var target = parseInt(numStr, 10);

            if (isNaN(target)) return;

            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * target);

                var prefix = hasTilde ? '~' : '';
                var suffix = hasPlus ? '+' : '';
                stat.textContent = prefix + current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    stat.textContent = prefix + target.toLocaleString() + suffix;
                }
            }

            requestAnimationFrame(step);
        });
    }

    /* Trigger counter animation when hero comes into view */
    if ('IntersectionObserver' in window) {
        var hero = document.querySelector('.hero');
        if (hero) {
            var heroObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                        heroObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            heroObs.observe(hero);
        }
    } else {
        animateCounters();
    }

    /* === DATA CARDS — STAGGERED ENTRANCE === */
    var dataCards = document.querySelectorAll('.data-card');

    if ('IntersectionObserver' in window) {
        var dataObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.5s ease';

                    requestAnimationFrame(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });

                    dataObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        dataCards.forEach(function (card) {
            dataObserver.observe(card);
        });
    } else {
        dataCards.forEach(function (card) {
            card.style.opacity = '1';
        });
    }

    console.log('🏺 Cerámica China — Sitio cargado correctamente');
    console.log('📖 Explora la historia milenaria de la cerámica china');
})();
