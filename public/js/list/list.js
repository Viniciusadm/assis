const $body = document.querySelector('main');
const $loading = document.querySelector('#img_loading');
const $div_error_assis = document.querySelector('#div_error_assis');
const $deactivate_checkbox = document.querySelector('#deactivate_checkbox');
const $finished_checkbox = document.querySelector('#finished_checkbox');
const $watching_checkbox = document.querySelector('#watching_checkbox');
const $deactivate_checkbox_status = localStorage.getItem('deactivate_checkbox');
const $finished_checkbox_status = localStorage.getItem('finished_checkbox');
const $watching_checkbox_status = localStorage.getItem('watching_checkbox');

$watching_checkbox.addEventListener('change', () => {
    showCheckbox($watching_checkbox, 'watching_checkbox', 'assistindo')
})
$deactivate_checkbox.addEventListener('change', () => {
    showCheckbox($deactivate_checkbox, 'deactivate_checkbox', 'desativado')
})
$finished_checkbox.addEventListener('change', () => {
    showCheckbox($finished_checkbox, 'finished_checkbox', 'finalizado')
})

const showDivs = ($checkbox_status, $type) => {
    const $divs = document.querySelectorAll(`[status="${$type}"]`);
    if ($checkbox_status === 'true') {
        $divs.forEach($div => {
            $div.removeAttribute('style');
        });
    }  else if ($checkbox_status === 'false') {
        $divs.forEach($div => {
            $div.setAttribute('style', 'display: none;');            
            const $title = $div.children[0].children[1].children[0];
            $title.setAttribute('hide', '');
        });
    }
} 

const showCheckbox = ($checkbox, $storage, $type) => {
    const $checked = $checkbox.hasAttribute('checked');
    const $divs = document.querySelectorAll(`[status="${$type}"]`);
    if ($checked === true) {
        $checkbox.removeAttribute('checked');
        localStorage.setItem($storage, false);
        $divs.forEach($div => {
            $div.setAttribute('style', 'display: none;');
            const $title = $div.children[0].children[1].children[0];
            $title.setAttribute('hide', '');
        });
    } else if ($checked === false) {
        $checkbox.setAttribute('checked', '');
        localStorage.setItem($storage, true);
        $divs.forEach($div => {
            $div.removeAttribute('style');
            const $title = $div.children[0].children[1].children[0];
            $title.removeAttribute('hide');
        });
    }
}

const mountCheckbox = () => {
    if ($deactivate_checkbox_status === 'true') {
        $deactivate_checkbox.setAttribute('checked', '');
    } else if ($deactivate_checkbox_status === 'false') {
        $deactivate_checkbox.removeAttribute('checked');
    }

    if ($finished_checkbox_status === 'true') {
        $finished_checkbox.setAttribute('checked', '');
    } else if ($finished_checkbox_status === 'false') {
        $finished_checkbox.removeAttribute('checked');
    }

    if ($watching_checkbox_status === 'true') {
        $watching_checkbox.setAttribute('checked', '');
    } else if ($watching_checkbox_status === 'false') {
        $watching_checkbox.removeAttribute('checked');
    }
}

const deactivate = ($id, $type) => {
    const $btn_change = document.querySelector(`#btn_change${$id}`);
    const $label_status = document.querySelector(`#label${$id}`);
    const $div = document.querySelector(`#assis_card${$id}`);

    if ($type === 'activate') {
        $btn_change.setAttribute('class', 'button_change button_deactivate status2');
        $btn_change.setAttribute('onclick', `deactivate(${$id}, "deactivate")`);
        $btn_change.innerText = 'Desativar';
        $label_status.innerHTML = `<span id="label${$id}" class="status1">Assistindo</span>`
        $div.setAttribute('status', 'assistindo');
        if (localStorage.getItem('watching_checkbox') === 'false') $div.setAttribute('style', 'display: none');
    } else if ($type === 'deactivate') {
        $btn_change.setAttribute('class', 'button_change button_deactivate status1');
        $btn_change.setAttribute('onclick', `deactivate(${$id}, "activate")`);
        $btn_change.innerText = 'Ativar';
        $label_status.innerHTML = `<span id="label${$id}" class="status2">Desativado</span>`;
        $div.setAttribute('status', 'desativado');
        if (localStorage.getItem('deactivate_checkbox') === 'false') $div.setAttribute('style', 'display: none');
    }

    const $form_data = new FormData;
    $form_data.append('id', $id);
    $form_data.append('type', $type);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    }

    fetch(`${$urlServer}api/deactivate.php`, $options);
}

const mountPage = () => {
    mountCheckbox();
    const $form_data = new FormData();
    $form_data.append('id_user', $id_user);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };
    
    fetch(`${$urlServer}api/assis.php`, $options).then($response => {
            $response.json().then($itens => {
                if ($itens !== 'not_assis') {
                    let $conteudo = '';
                    for (const $assis of $itens) {
                        const $types = $assis.type.replace(',', ' ');
                        if (Number($assis.status) === 1) {
                            var $status = 'Assistindo';
                        var $button_change = `<button id="btn_change${$assis.id}" class='button_change button_deactivate status2' onclick='deactivate(${$assis.id}, "deactivate");'>Desativar</button>`;
                        } else if (Number($assis.status) === 2) {
                            var $status = 'Desativado';
                        var $button_change = `<button id="btn_change${$assis.id}" class='button_change button_activate status1' onclick='deactivate(${$assis.id}, "activate");'>Ativar</button>`;
                        } else if (Number($assis.status) === 3) {
                            var $status = 'Finalizado';
                        var $button_change = "";
                        }
                        $conteudo +=
                        `<div id="assis_card${$assis.id}" types="${$types}" status="${$status.toLowerCase()}" class="assis-card">
                            <div class="header" id="assis${$assis.id}">
                                <div id="div.capa">
                                    <img class="capa-list" src="${$urlServer}images/${$user_actual}/${$assis.nome_id}.jpg">
                                </div>
                                
                                <div class="head">
                                    <h3 id="titulo${$assis.id}" class="titulo">${$assis.nome}</h3>
                                    <input class="episodio" type="text" id="episode${$assis.id}" value="Episódios: ${$assis.ep_atual}/${$assis.ep_tot}" disabled>
                                </div>
        
                                <div class="div_icon_editar">
                                    <img id="img_capa${$assis.id}" onclick="edit('${$assis.id}')" class="icon_editar" src="../images/pencil.svg">
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
                showDivs($watching_checkbox_status, 'assistindo');
                showDivs($deactivate_checkbox_status, 'desativado');
                showDivs($finished_checkbox_status, 'finalizado');
            } else if ($itens === 'not_assis') {
                $div_error_assis.removeAttribute('style');
                $loading.setAttribute('style' , 'display: none;');
            } 
        });
    });
}

mountPage();