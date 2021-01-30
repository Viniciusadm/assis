const $url = location.href;
const $capa = document.querySelector('.capa');
const $titulo = document.querySelector('#titulo');
const $ep_atual = document.querySelector('#ep_atual');
const $ep_tot = document.querySelector('#ep_tot');
const $nome_id = document.querySelector('#nome_id');
const $btn = document.querySelector('#sort');

$btn.addEventListener('click', () => {
    fetch(`${$url}api.php?nomes`)
        .then($response => {
            $response.json()
                .then($itens => {
                    $qtd = $itens.length;
                    $cont = 0;
                    let $intervalo = setInterval(() => {
                        $capa.setAttribute('src', `${$url}imagens/${$itens[$cont]}.jpg`);
                        $cont++;
                        if ($cont === $qtd) {
                            clearInterval($intervalo);
                            fetch(`${$url}api.php?assis`)
                                .then($response => {
                                    $response.json()
                                        .then($itens => {
                                            $capa.setAttribute('src', `${$url}imagens/${$itens['nome_id']}.jpg`);
                                            $titulo.innerHTML = $itens['nome'];
                                            $ep_atual.innerHTML = `Episódio Atual: ${Number($itens['ep_atual']) + 1}`;
                                            $ep_tot.innerHTML = `Episódios Totais: ${$itens['ep_tot']}`;
                                            $nome_id.value = $itens['nome_id'];
                                        })
                                });

                        }
                    }, 125)
                })
        })
});