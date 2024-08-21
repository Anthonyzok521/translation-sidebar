const languages = document.querySelector('.languages');
const listLanguages = document.querySelectorAll('.list-langs');
const code = document.querySelectorAll('.code');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const btn = document.querySelector('#btn');
const copy = document.querySelector('.copy');
const loader = document.querySelector('.loader');
const lang1 = document.querySelector('#lang1');
const lang2 = document.querySelector('#lang2');

languages.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'DIV') {
        if (e.target.id === 'lang1') {
            lang2.classList.remove('select');
            lang1.classList.add('select');
            listLanguages[0].classList.toggle('select');
            /*code[0].textContent = 'En';
            code[1].textContent = 'Es';
            code[0].classList.remove('anim');
            code[1].classList.remove('anim');*/
        } else if (e.target.id === 'lang2') {
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
            listLanguages.forEach(li => {
                if (li.textContent === lang1.children[0].textContent) {
                    li.classList.toggle('select');
                }
                if (li.textContent === lang2.children[0].textContent) {
                    li.classList.toggle('select');
                }
            });
        }, 10);
    }
});

listLanguages[0].addEventListener('mouseleave', () => { listLanguages[0].classList.toggle('select'); });
listLanguages[1].addEventListener('mouseleave', () => { listLanguages[1].classList.toggle('select'); });

btn.addEventListener('click', async() => {
    if (input.value !== '') {
        loader.classList.toggle('spinner');
        const res = await fetch("https://translate-gemini-api.vercel.app", {
            method: "POST",
            body: JSON.stringify({
                text: `${input.value}`,
                from_lang: `${code[0].textContent.toLowerCase()}`,
                to_lang: `${code[1].textContent.toLowerCase()}`,
            }),
            headers: { "Content-Type": "application/json" }
        });

        let result = await res.json();

        console.log(result);
        output.value = result;
        if (output.value !== '') {
            loader.classList.toggle('spinner');
        }
    }
});

copy.addEventListener('click', () => {
    copy.classList.toggle('click');
    setTimeout(() => {
        copy.classList.toggle('click');
    }, 500);

    writeClipboardText(output.value);
});

async function writeClipboardText(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error(error.message);
    }
}
