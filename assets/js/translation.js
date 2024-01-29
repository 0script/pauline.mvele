function returnBrowserLanguagePref() {
    return navigator.language
}

function getLangLocalStorage() {

    return localStorage.getItem('language')
}

function setLocalLangPreference(lang) {
    localStorage.setItem('language', lang)
}

function updateContent(lang_data) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n')
        element.textContent = lang_data[key]
    })
}


async function getLanguageData(lang) {
    const response = await fetch(`${lang}.json`)
    return response.json()
}

function setLanguage(lang) {
    const lang_data = french_t
    console.log(lang_data)
    updateContent(lang_data)
}

let fr_btn = document.querySelector('ul.sous a');
let en_btn = document.querySelector('ul.sous li:last-child a');


// change language without button click
let browser_lang = returnBrowserLanguagePref()
if (browser_lang.includes('fr')) {
    // change to french
    setLanguage('fr')
}

// change language according to localstorage
let local_storage = localStorage.getItem('language')
if (local_storage) {
    if (local_storage.includes('fr'))
        setLanguage('fr')
}


fr_btn.addEventListener('click', () => {

    document.querySelector('html').setAttribute('lang', 'fr')

    let current_lang_btn = document.querySelector('span.current-lang')

    current_lang_btn.setAttribute('data-i18n', 'french_fr')
    current_lang_btn.innerHTML = 'French'

    setLanguage('fr')

})