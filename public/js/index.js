const $url = 'http://localhost:8000/';
const $urlServer = 'http://localhost:8001/';
const $capa = document.querySelector('#capa');
const $titulo = document.querySelector('#titulo');
const $ep_atual = document.querySelector('#ep_atual');
const $ep_tot = document.querySelector('#ep_tot');
const $nome_id = document.querySelector('#nome_id');
const $btnSort = document.querySelector('#sort');
const $btnConfirm = document.querySelector('#confirm');

$btnSort.addEventListener('click', () => {
    const $options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(`${$urlServer}api/_assis.php`, $options)
        .then($response => {
            $response.json()
                .then($itens => {
                    $capa.setAttribute('src', `${$url}images/${$itens['nome_id']}.jpg`);
                    $titulo.innerHTML = $itens['nome'];
                    $ep_atual.innerHTML = `Episódio Atual: ${Number($itens['ep_atual']) + 1}`;
                    $ep_tot.innerHTML = `Episódios Totais: ${$itens['ep_tot']}`;
                    $nome_id.value = $itens['nome_id'];
                    $btnConfirm.removeAttribute('disabled');
                });
            });
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
    
    fetch(`${$urlServer}api/_confirm.php`, $options)
        .then($response => {
            if($response.status == 200){
                window.location.href = `${$url}pages/confirm.html`;
            } else {
                throw response.status;
            }
    });
});