const languages = document.querySelector('.languages');
const listLanguages = document.querySelectorAll('.list-langs');
const listLanguagesCode = document.querySelectorAll('.list-langs-code');
const code = document.querySelectorAll('.code');
/**  @type {HTMLTextAreaElement} */
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const btn = document.querySelector('#btn');
const copy = document.querySelector('.copy');
const loader = document.querySelector('.loader');
const lang1 = document.querySelector('#lang1');
const lang2 = document.querySelector('#lang2');

let codes = [];
listLanguagesCode[0].childNodes.forEach(li => {
    if (li.tagName === 'LI') {
        let c = li.textContent.trim();
        codes.push(c);
    }
});

languages.addEventListener('click', (e) => {

    let lang_actual = '';
    let lang_selected = '';

    if (e.target && e.target.tagName === 'DIV' || e.target.tagName === 'SPAN') {
        if (e.target.id === 'lang1' || e.target.parentElement.id === 'lang1') {
            lang2.classList.remove('select');
            lang1.classList.add('select');
            listLanguages[0].classList.toggle('select');
        } else if (e.target.id === 'lang2' || e.target.parentElement.id === 'lang2') {
            lang1.classList.remove('select');
            lang2.classList.add('select');
            listLanguages[1].classList.toggle('select');
        }
        setTimeout(() => {
            code[0].classList.remove('anim');
            code[1].classList.remove('anim');

            listLanguages.forEach(ul => {

                if (ul.classList.contains('select')) {
                    ul.childNodes.forEach(li => {
                        if (li.textContent === e.target.children[1].textContent) {
                            li.classList.add('select');
                        }
                        if (li.tagName === 'LI' && li.textContent !== e.target.children[1].textContent) {
                            li.classList.remove('select');
                        }
                    });
                }

            });
        }, 10);
    }

    if (e.target && e.target.tagName === 'LI') {
        const ul = e.target.parentElement;
        /** @type {HTMLDivElement} */
        const div = ul.parentElement;
        const lang = div.children[1];
        let index = null;
        lang_actual = lang.textContent;
        lang.textContent = e.target.textContent;
        ul.childNodes.forEach(li => {
            if (li.tagName === 'LI') {
                li.classList.remove('select');
            }
        });
        e.target.classList.toggle('select');
        ul.childNodes.forEach(li => {
            if (li.tagName === 'LI' && li.classList.contains('select')) {
                index = parseInt(li.id);
            }
        });
        lang_selected = lang.textContent;
        if (div.id === 'lang1') {
            if (lang_selected === lang2.children[1].textContent) {
                lang2.children[1].textContent = lang_actual;
                let a = code[0].textContent;
                code[0].textContent = code[1].textContent;
                code[1].textContent = a;
            }
            code[0].textContent = codes[index];

        } else if (div.id === 'lang2') {
            if (lang_selected === lang1.children[1].textContent) {
                lang1.children[1].textContent = lang_actual;
                let a = code[1].textContent;
                code[1].textContent = code[0].textContent;
                code[0].textContent = a;
            }
            code[1].textContent = codes[index];
        }
    }
});

listLanguages[0].addEventListener('mouseleave', () => {
    listLanguages[0].classList.toggle('select');
    code[0].classList.add('anim');
    code[1].classList.add('anim');
});
listLanguages[1].addEventListener('mouseleave', () => {
    listLanguages[1].classList.toggle('select');
    code[0].classList.add('anim');
    code[1].classList.add('anim');
});

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

console.log(codes);
