const btn = document.querySelector('button');
const languages = document.querySelector('.languages');
const boxs = document.querySelector('.boxs');

languages.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'DIV') {
        if (e.target.id === 'lang1' && !e.target.classList.contains('selec')) {
            lang2.classList.remove('select');
            lang1.classList.add('select');
        } else if (e.target.id === 'lang2' && !e.target.classList.contains('selec')) {
            lang1.classList.remove('select');
            lang2.classList.add('select');
        }

        boxs.style = 'animation: lang 1s ease forwards';
    }
});


btn.addEventListener('click', () => {
    btn.style.backgroundColor = 'white';
});
