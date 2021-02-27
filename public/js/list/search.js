const $input_search = document.querySelector('#input-search');

$input_search.addEventListener('input', () => {
    const $search = $input_search.value.toLowerCase();
    const $titles = document.querySelectorAll('h3.titulo:not([hide])');
    for (const $title of $titles) {
        const $titleText = $title.innerText.toLowerCase();
        const $search_size = $search.length;
        if ($search_size === 0) {
            $title.parentElement.parentElement.parentElement.removeAttribute('style');
        }
        if ($search_size === 1) {
            const $letra0 = $search[0];
            if ($titleText.includes($letra0) === false) {
                $title.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
            }
            if ($titleText.includes($letra0) === true) {
                $title.parentElement.parentElement.parentElement.removeAttribute('style');
            }
        } else if ($search_size === 2) {
            const $letra0 = $search[0];
            const $letra1 = $search[1];
            if ($titleText.includes($letra0) === false && $titleText.includes($letra1) === false) {
                $title.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
            }
            if ($titleText.includes($letra0) === true && $titleText.includes($letra1) === true) {
                $title.parentElement.parentElement.parentElement.removeAttribute('style');
            }
        } else if ($search_size > 2) {
            if ($titleText.includes($search) === false) {
                $title.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
            }
            if ($titleText.includes($search) === true) {
                $title.parentElement.parentElement.parentElement.removeAttribute('style');
            }
        }
    }
})