const $link_input = document.querySelector('#link_input');
const $send_button = document.querySelector('#send_button');
const $link_a = document.querySelector('#link_a');

$send_button.addEventListener('click', () => {
    const $link_value = $link_input.value;
    const $form_data = new FormData();
    $form_data.append('link', $link_value);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    }

    fetch(`${$urlServer}api/links.php`, $options);
    document.location.reload();
})

const $options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

fetch(`${$urlServer}api/links.php`, $options)
    .then($reponse => {
        $reponse.json()
            .then($link => {
                $link_a.setAttribute('href', $link);
            })
    })
