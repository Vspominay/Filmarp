(function () {
    const openBurger = document.querySelector('.header__menu-mob');
    const closeBurger = document.querySelector('.header__menu-close');
    const body = document.querySelector('body');
    const menu = document.querySelector('.header__menu-response')

    openBurger.addEventListener('click', () => {
        menu.classList.add('active');
        body.style.overflow = 'hidden';
    })

    closeBurger.addEventListener('click', () => {
        menu.classList.remove('active');
        body.style.overflow = 'auto';
    })
})();
