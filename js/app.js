(function () {
    'use strict';

    var burger = document.querySelector('.rail__burger');
    var nav = document.getElementById('railnav');
    var body = document.body;

    function setMenu(open) {
        if (!nav || !burger) {
            return;
        }

        nav.classList.toggle('rail__nav--open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        body.classList.toggle('menu-open', open);
    }

    if (burger && nav) {
        burger.addEventListener('click', function () {
            setMenu(!nav.classList.contains('rail__nav--open'));
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenu(false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('rail__nav--open')) {
                setMenu(false);
                burger.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1024 && nav.classList.contains('rail__nav--open')) {
                setMenu(false);
            }
        });
    }

    var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
    var products = Array.prototype.slice.call(document.querySelectorAll('#productGrid .prow'));

    filters.forEach(function (button) {
        button.addEventListener('click', function () {
            var value = button.getAttribute('data-filter');

            filters.forEach(function (other) {
                var active = other === button;
                other.classList.toggle('is-active', active);
                other.setAttribute('aria-pressed', String(active));
            });

            products.forEach(function (card) {
                var show = value === 'all' || card.getAttribute('data-cat') === value;
                card.hidden = !show;
            });
        });
    });

    var year = document.getElementById('year');

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
})();
