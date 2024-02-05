let fr_btn = document.querySelector('ul.sous a');
let en_btn = document.querySelector('ul.sous li:last-child a');

function returnBrowserLanguagePref() {
    return navigator.language
}

function getLangPreference() {

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


    let apiUrl = `https://paulinemvele.netlify.app/assets/js/language/${lang}.json`
    // let apiUrl = `http://localhost:8000/assets/js/language/${lang}.json`

    try {
        const response = await fetch(apiUrl);

        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON and return it
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle errors that occurred during the fetch or processing of the response
        console.error('Error:', error);
        throw error; // Re-throw the error for further handling, if needed
    }
}

async function setLanguage(lang) {

    try {
        const data = await getLanguageData(lang);
        // Handle the data from the successful response
        console.log('Successful response:', data);

        document.querySelector('html').setAttribute('lang', 'fr')
        let current_lang_btn = document.querySelector('span.current-lang')
        current_lang_btn.setAttribute('data-i18n', 'french_fr')
        current_lang_btn.innerHTML = 'French'
        setLocalLangPreference('fr')
        updateContent(data);
    } catch (error) {
        // Handle errors that occurred during the fetch or processing of the response
        console.error('Error:', error);
    }
}

// change language without button click
let browser_lang = returnBrowserLanguagePref()
if (browser_lang.includes('fr')) {
    // change to french
    setLanguage('fr')
}

// change language according to localstorage
// let local_storage = localStorage.getItem('language')
// if (local_storage) {
//     if (local_storage.includes('fr'))
//         setLanguage('fr')
// }


fr_btn.addEventListener('click', () => {

    setLanguage('fr')
})

en_btn.addEventListener('click', () => {

    document.querySelector('html').setAttribute('lang', 'en')

    setLocalLangPreference('en')
    window.location.reload()

})

function setLanguageAuto() {
    if (navigator.language.includes('fr') && getLangPreference().includes('fr')) {

        setLanguage('fr')
    } else if (getLangPreference().includes('fr')) {
        setLanguage('fr')
    }

}

setLanguageAuto()