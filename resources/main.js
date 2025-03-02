const languages = document.querySelector('.languages');
const listLanguages = document.querySelector('.list-langs');
const listLanguagesCode = document.querySelector('.list-langs-code');
const code = document.querySelectorAll('.code');
/**  @type {HTMLTextAreaElement} */
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const btn = document.querySelector('#btn');
const copy = document.querySelector('.copy');
const clipBoard = document.querySelector('.clipboard');
const loader = document.querySelector('.loader');
/**  @type {HTMLDivElement} */
const lang1 = document.querySelector('#lang1');
/**  @type {HTMLDivElement} */
const lang2 = document.querySelector('#lang2');
/**  @type {HTMLDivElement} */
const toolTip = document.querySelector('#tooltip');
/**  @type {HTMLDivElement} */
const circle = document.querySelector('#circle');

let codes = [];
listLanguagesCode.childNodes.forEach(li => {
    if (li.tagName === 'LI') {
        let c = li.textContent.trim();
        codes.push(c);
    }
});

languages.addEventListener('click', (e) => {

    let lang_actual = '';
    let lang_selected = '';

    if (e.target && e.target.tagName === 'DIV' || e.target.tagName === 'SPAN') {
        listLanguages.classList.toggle('select');
        if (e.target.id === 'lang1' || e.target.parentElement.id === 'lang1') {
            lang2.classList.remove('select');
            lang1.classList.add('select');
            if(lang1.children.length === 1){
                lang1.appendChild(listLanguages);
            }
            if (lang2.children.length > 1) {
                lang2.removeChild(listLanguages);
            }
        } else if (e.target.id === 'lang2' || e.target.parentElement.id === 'lang2') {
            lang1.classList.remove('select');
            lang2.classList.add('select');
            if(lang2.children.length === 1){
                lang2.appendChild(listLanguages);
            }
            if (lang1.children.length > 1) {
                lang1.removeChild(listLanguages);
            }
        }
        

        setTimeout(() => {
            code[0].classList.remove('anim');
            code[1].classList.remove('anim');
            for(let i = 0; i < listLanguages.children.length; i++){
                if (listLanguages.children[i].textContent === listLanguages.parentElement.querySelector('span').textContent) {
                    listLanguages.children[i].classList.add('select');
                }
                if (listLanguages.children[i].tagName === 'LI' && listLanguages.children[i].textContent !== listLanguages.parentElement.querySelector('span').textContent) {
                    listLanguages.children[i].classList.remove('select');
                }
            };
        }, 10);
    }

    if (e.target && e.target.tagName === 'LI') {
        const ul = e.target.parentElement;
        /** @type {HTMLDivElement} */
        const div = ul.parentElement;
        const lang = div.querySelector('span');
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
            if (lang_selected === lang2.querySelector('span').textContent) {
                lang2.querySelector('span').textContent = lang_actual;
                let a = code[0].textContent;
                code[0].textContent = code[1].textContent;
                code[1].textContent = a;
            }
            code[0].textContent = codes[index];

        } else if (div.id === 'lang2') {
            if (lang_selected === lang1.querySelector('span').textContent) {
                lang1.querySelector('span').textContent = lang_actual;
                let a = code[1].textContent;
                code[1].textContent = code[0].textContent;
                code[0].textContent = a;
            }
            code[1].textContent = codes[index];
        }
        listLanguages.classList.remove('select');
    }
});

listLanguages.addEventListener('mouseleave', () => {
    listLanguages.classList.remove('select');
    code[0].classList.add('anim');
    code[1].classList.add('anim');
});


circle.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
        let code0 = code[0].textContent;
        let code1 = code[1].textContent;
        let span0 = lang1.querySelector('span').textContent;
        let span1 = lang2.querySelector('span').textContent;
        lang1.querySelector('span').textContent = span1;
        lang2.querySelector('span').textContent = span0;
        code[0].textContent = code1;
        code[1].textContent = code0;
        code[0].classList.remove('anim');
        code[1].classList.remove('anim');
        setTimeout(() => {
            code[0].classList.add('anim');
            code[1].classList.add('anim');
        }, 10);
        
    }
});

btn.addEventListener('click', async () => {
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

input.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        btn.click();
    }
});


copy.addEventListener('click', () => {
    copy.classList.toggle('click');
    setTimeout(() => {
        copy.classList.toggle('click');
    }, 500);

    copyText(output.value);
});

copy.addEventListener('mouseover', (e) => {
    /**@type {MouseEvent} */
    const mouse = e;
    toolTip.textContent = 'Copy text';
    toolTip.style.display = 'flex';
    toolTip.style.left = `${mouse.clientX - 30}px`;
    toolTip.style.top = `${mouse.clientY - 30}px`;
});

copy.addEventListener('mouseout', () => {
    toolTip.textContent = '';
    toolTip.style.display = 'none';
});

clipBoard.addEventListener('click', () => {
    clipBoard.classList.toggle('click');
    setTimeout(() => {
        clipBoard.classList.toggle('click');
    }, 500);

    pasteText();
});


clipBoard.addEventListener('mouseover', (e) => {
    toolTip.textContent = 'Paste text';
    /**@type {MouseEvent} */
    const mouse = e;
    toolTip.style.display = 'flex';
    toolTip.style.left = `${mouse.clientX - 30}px`;
    toolTip.style.top = `${mouse.clientY - 30}px`;
});

clipBoard.addEventListener('mouseout', () => {
    toolTip.textContent = '';
    toolTip.style.display = 'none';
});

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error(error.message);
    }
}

async function pasteText() {
    try {
        input.value = await navigator.clipboard.readText();
    } catch (error) {
        console.error(error.message);
    }
}