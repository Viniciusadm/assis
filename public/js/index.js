const $card = document.querySelector('#container_card');
const $sortCard = document.querySelector('#container_sort_card');
const $capa = document.querySelector('#capa');
const $titulo = document.querySelector('#titulo');
const $ep_atual = document.querySelector('#ep_atual');
const $ep_tot = document.querySelector('#ep_tot');
const $nome_id = document.querySelector('#nome_id');
const $btnSort = document.querySelector('#sort');
const $btnConfirm = document.querySelector('#confirm');
const $btnChangePage = document.querySelector('#button_sort_card');
const $loading = document.querySelector('#img_loading');
const $return = document.querySelector('#span_button_voltar');
const $nav_index = document.querySelector('#nav_index');
const $div_error_assis = document.querySelector('#div_error_assis');
const $sort_card_buttons = document.querySelector('#sort_card_buttons');
const $buttons_choice_div = document.querySelector('#buttons_choice_div');
const $button_prop = document.querySelector('#button_prop');
const $button_normal = document.querySelector('#button_normal');

if ($id_user === "1") {
    const $button = `<a href="pages/link.html"><button class="button button_sort_card"><img src="images/link.svg" alt="link"> Link</button></a>`;
    $sort_card_buttons.insertAdjacentHTML('beforeend', $button);
}

const pegarAssis = ($prop) => {
    $return.removeAttribute('style');
    $sortCard.setAttribute('style' , 'display: none;');
    $loading.removeAttribute('style');
    
    const $form_data = new FormData();
    console.log($id_user);
    console.log($prop);
    $form_data.append('id_user', $id_user);
    $form_data.append('prop', $prop);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };

    fetch(`${$urlServer}api/random.php`, $options)
        .then($response => { $response.json()
        .then($itens => {
            if ($itens !== 'not_assis') {
                $capa.setAttribute('src', `${$urlServer}images/${$user_actual}/${$itens['nome_id']}.jpg`);
                $titulo.innerHTML = $itens['nome'];
                $ep_atual.innerHTML = `Próximo Episódio: <span class="episodeDestaque">${Number($itens['ep_atual']) + 1}</span>`;
                $ep_tot.innerHTML = `Total: <span class="episodeDestaque">${$itens['ep_tot']}</span>`;
                $nome_id.value = $itens['nome_id'];
                $card.removeAttribute('style');
                $loading.setAttribute('style' , 'display: none;');
            } else if ($itens === 'not_assis') {
                $div_error_assis.removeAttribute('style');
                $loading.setAttribute('style' , 'dis2play: none;');
            }
        });
    });
};

$return.addEventListener('click', () => {
    $buttons_choice_div.setAttribute('style', 'display: none;');
    $btnChangePage.removeAttribute('style');
    $card.setAttribute('style', 'display: none;');
    $return.setAttribute('style', 'display: none;');
    $div_error_assis.setAttribute('style' , 'display: none;');
    $sortCard.removeAttribute('style');
})

$btnChangePage.addEventListener('click', () => {
    $buttons_choice_div.removeAttribute('style');
    $btnChangePage.setAttribute('style', 'display: none;')
});

$btnSort.addEventListener('click', () => {
    pegarAssis($card);
});

$btnConfirm.addEventListener('click', () => {
    $btnConfirm.setAttribute('disabled', '');
    const $form_data = new FormData();
    $form_data.append('assis', $nome_id.value);
    $form_data.append('id_user', $id_user)

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };
    
    fetch(`${$urlServer}api/confirm.php?`, $options)
        .then($response => {
            if($response.status == 200){
                window.location.href = `${$url}pages/confirm_assis.html`;
            } else {
                throw response.status;
            }
    });
});