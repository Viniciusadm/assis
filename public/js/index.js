// const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
// const $url = 'http://assis.surge.sh/';
const $url = 'http://localhost:8000/'
const $urlServer = 'http://localhost:8001/';
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
const $return = document.querySelector('.button_return');

const pegarAssis = ($btn) => {
    $btn.setAttribute('style' , 'display: none;');
    $loading.removeAttribute('style');
    
    const $options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`${$urlServer}api/random.php`, $options)
        .then($response => {
            $response.json()
                .then($itens => {
                    $capa.setAttribute('src', `${$urlServer}images/${$itens['nome_id']}.jpg`);
                    $titulo.innerHTML = $itens['nome'];
                    $ep_atual.innerHTML = `Próximo Episódio: <span class="episodeDestaque">${Number($itens['ep_atual']) + 1}</span>`;
                    $ep_tot.innerHTML = `Total: <span class="episodeDestaque">${$itens['ep_tot']}</span>`;
                    $nome_id.value = $itens['nome_id'];
                    $card.removeAttribute('style');
                    $loading.setAttribute('style' , 'display: none;');
                });
            });
};

$return.addEventListener('click', () => {
    $card.setAttribute('style', 'display: none;');
    $sortCard.removeAttribute('style');
})

$btnChangePage.addEventListener('click', () => {
    pegarAssis($sortCard);
});

$btnSort.addEventListener('click', () => {
    pegarAssis($card);
});

$btnConfirm.addEventListener('click', () => {
    let formData = new FormData();
    formData.append('assis', $nome_id.value);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: formData
    };
    
    fetch(`${$urlServer}api/confirm.php`, $options)
        .then($response => {
            if($response.status == 200){
                window.location.href = `${$url}pages/confirm.html`;
            } else {
                throw response.status;
            }
    });
});