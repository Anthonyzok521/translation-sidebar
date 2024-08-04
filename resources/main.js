const btn = document.querySelector('button');
const languages = document.querySelector('.languages');
const code = document.querySelectorAll('.code');

languages.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'DIV') {
        if (e.target.id === 'lang1' && !e.target.classList.contains('selec')) {
            lang2.classList.remove('select');
            lang1.classList.add('select');
            code[0].textContent = 'En';
            code[1].textContent = 'Es';
            code[0].classList.remove('anim');
            code[1].classList.remove('anim');
        } else if (e.target.id === 'lang2' && !e.target.classList.contains('selec')) {
            lang1.classList.remove('select');
            lang2.classList.add('select');
            code[0].textContent = 'Es';
            code[1].textContent = 'En';
            code[0].classList.remove('anim');
            code[1].classList.remove('anim');
        }
        setTimeout(() => {
            code[0].classList.add('anim');
            code[1].classList.add('anim');
        }, 10);
    }
});


btn.addEventListener('click', () => {

});
