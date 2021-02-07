// const $url = 'http://assis.surge.sh/';
// const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
const $url = 'http://localhost:8000/';
const $urlServer = 'http://localhost:8001/';
let $body = document.querySelector('main');
const $loading = document.querySelector('#img_loading');

const deactivate = ($id, $type) => {
    const $btn_change = document.querySelector(`#btn_change${$id}`);
    const $label_status = document.querySelector(`#label${$id}`);

    if ($type === 'activate') {
        $btn_change.setAttribute('class', 'button_change button_deactivate status2');
        $btn_change.setAttribute('onclick', `deactivate(${$id}, "deactivate")`);
        $btn_change.innerText = 'Desativar';
        $label_status.innerHTML = `<span id="label${$id}" class="status1">Assistindo</span>`
    } else if ($type === 'deactivate') {
        $btn_change.setAttribute('class', 'button_change button_deactivate status1');
        $btn_change.setAttribute('onclick', `deactivate(${$id}, "activate")`);
        $btn_change.innerText = 'Ativar';
        $label_status.innerHTML = `<span id="label${$id}" class="status2">Desativado</span>`
    }

    const $formData = new FormData;
    $formData.append('id', $id);
    $formData.append('type', $type);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
    }

    fetch(`${$urlServer}api/deactivate.php`, $options);
}

const mountPage = () => {
    const $options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    
    fetch(`${$urlServer}api/assis.php`, $options).then($response => {
            $response.json().then($itens => {
                $itens.sort(($a, $b) => $a.nome < $b.nome ? -1 : $a.nome > $b.nome ? 1 : 0);
                $conteudo = '';
                for ($assis of $itens) {
                    if (Number($assis.status) === 1) {
                        $status = 'Assistindo';
                        $button_change = `<button id="btn_change${$assis.id}" class='button_change button_deactivate status2' onclick='deactivate(${$assis.id}, "deactivate");'>Desativar</button>`;
                    } else if (Number($assis.status) === 2) {
                        $status = 'Desativado';
                        $button_change = `<button id="btn_change${$assis.id}" class='button_change button_activate status1' onclick='deactivate(${$assis.id}, "activate");'>Ativar</button>`;
                    } else if (Number($assis.status) === 3) {
                        $status = 'Finalizado';
                        $button_change = "";
                    }
                    $conteudo +=
                    `<div id="assis_card${$assis.id}" class="assis-card">
                        <div class="header" id="assis${$assis.id}">
                            <div id="div.capa">
                                <img class="capa-list" src="${$urlServer}images/${$assis.nome_id}.jpg">
                            </div>
                            
                            <div class="head">
                                <h3 id="titulo${$assis.id}" class="titulo">${$assis.nome}</h3>
                                <input class="episodio" type="text" id="episode${$assis.id}" value="Episódios: ${$assis.ep_atual}/${$assis.ep_tot}" disabled>
                            </div>
    
                            <div class="div_icon_editar">
                                <img id="img_capa${$assis.id}" onclick="edit('${$assis.nome_id}')" class="icon_editar" src="../images/pencil.svg">
                            </div>
                        </div>
                        <div id="footer${$assis.id}" class="footer">
                            <span id="label${$assis.id}" class="status${$assis.status}">${$status}</span>
                            ${$button_change}
                        </div>
                    </div>`
            }
            $loading.setAttribute('style', 'display: none;')
            $list.removeAttribute('style');
            $body.innerHTML = $conteudo;
            });
        });
}

mountPage();