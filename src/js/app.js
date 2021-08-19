const nav = document.querySelector('.nav');
const btn = document.querySelector('.btn-icon');
const icon = document.querySelector('.fas');

btn.addEventListener('click', () => {
   nav.classList.toggle('active');
   icon.classList.toggle('fa-times');
   icon.classList.toggle('fa-bars');
});



