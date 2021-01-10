const hamburger = document.querySelector('.hamburger');
const body = document.querySelector('.body');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--active');
    body.classList.toggle('menu--active');
});
