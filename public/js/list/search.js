const $input_search = document.querySelector('#input-search');

$input_search.addEventListener('input', () => {
    const $search = $input_search.value.toLowerCase();
    const $titles = document.querySelectorAll('.titulo');
    for ($title of $titles) {
        $titleText = $title.innerText.toLowerCase();
        if ($search.length === 0) {
            $title.parentElement.parentElement.parentElement.removeAttribute('style');
        }
        if ($search.length === 1) {
            $letra0 = $search[0];
            if ($titleText.includes($letra0) === false) {
                $title.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
            }
            if ($titleText.includes($letra0) === true) {
                $title.parentElement.parentElement.parentElement.removeAttribute('style');
            }
        } else if ($search.length === 2) {
            $letra0 = $search[0];
            $letra1 = $search[1];
            if ($titleText.includes($letra0) === false && $titleText.includes($letra1) === false) {
                $title.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
            }
            if ($titleText.includes($letra0) === true && $titleText.includes($letra1) === true) {
                $title.parentElement.parentElement.parentElement.removeAttribute('style');
            }
        } else if ($search.length > 2) {
            if ($titleText.includes($search) === false) {
                $title.parentElement.parentElement.parentElement.setAttribute('style', 'display: none;');
            }
            if ($titleText.includes($search) === true) {
                $title.parentElement.parentElement.parentElement.removeAttribute('style');
            }
        }
    }
})