// Títulos
const $title_edit = document.querySelector('#title_edit');
const $titulo_confirm = document.querySelector('#titulo_confirm');
const $capa_editar = document.querySelector('#capa_editar');
// Divs
const $list = document.querySelector('#list');
const $edit = document.querySelector('#edit_all_nav');
// Inputs
const $nome = document.querySelector('#nome');
const $nome_id = document.querySelector('#nome_id');
const $ep_atual = document.querySelector('.ep_atual');
const $ep_tot = document.querySelector('.ep_tot');
const $input_edit_image = document.querySelector('#input_edit_image');
// Botões
const $btn_atual_plus = document.querySelector('#btn_atual_plus');
const $btn_atual_dash = document.querySelector('#btn_atual_dash');
const $btn_tot_plus = document.querySelector('#btn_tot_plus');
const $btn_tot_dash = document.querySelector('#btn_tot_dash');
const $button_voltar_edit = document.querySelector('#button_voltar_edit');
const $edit_image = document.querySelector('#edit_image');
const $confirm_edit_image = document.querySelector('#confirm_edit_image');
const $button_finish = document.querySelector('#button_finish');

// Eventos

$nome.addEventListener('input', () => {
    $nome_id.value = removeCharacters($nome.value);
    const $id = $nome_id.getAttribute('key');
    const $nome_value = $nome.value;
    const $img_capa = document.querySelector(`#img_capa${$id}`);
    $img_capa.setAttribute('onclick', `edit('${$id}')`);
    $form_data = new FormData();
    $form_data.append('nome', $nome_value);
    $form_data.append('nome_id', $nome_id.value);
    $form_data.append('id', $id)

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    }
    submitName($options, $id, $nome_value);
})

$input_edit_image.addEventListener('change', () => {
    const $capa_load = $input_edit_image.files[0];
    const $fileReader = new FileReader();
    $fileReader.onloadend = () => {
        $capa_editar.setAttribute('src', $fileReader.result)
    }
    $fileReader.readAsDataURL($capa_load);
    $edit_image.setAttribute('style', 'display: none;')
    $confirm_edit_image.removeAttribute('style');
})

$confirm_edit_image.addEventListener('click', () => {
    const $capa_load = $input_edit_image.files[0];
    const $nome_id_value = document.querySelector('#nome_id').value
    
    const $form_data = new FormData();
    $form_data.append('capa', $capa_load);
    $form_data.append('nome_id', $nome_id_value);
    $form_data.append('id_user', $id_user);

    $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };

    fetch(`${$urlServer}api/edit.php`, $options)
        .then($response => {
            if ($response.status === 200) {
                document.location.reload(true);
            }
        })

})

$button_voltar_edit.addEventListener('click', () => {
    changePage($edit);
    $confirm_edit_image.setAttribute('style', 'display: none;')
    $edit_image.removeAttribute('style');
})

// Funções Editar (nome/nome_id)

const removeCharacters = $string => {
    $string = $string.normalize("NFD").replace(/[^0-9a-zA-Zs]/g, "");
    return $string;
}

const submitName = ($options, $id, $nome_value) => {
    const $nome_list = document.querySelector(`#titulo${$id}`);
    $nome_list.innerText = $nome_value;
    fetch(`${$urlServer}api/edit.php`, $options)
}

// Funções Editar (episódios)

const changeEpisode = ($type, $id, $operation, $name) => {
    if ($type === 'atual') {
        var $input_episode = document.querySelector('#input_atual');
        var $episode_other = Number(document.querySelector('#input_tot').value);
    } else if ($type === 'tot') {
        var $input_episode = document.querySelector('#input_tot');
        var $episode_other = Number(document.querySelector('#input_atual').value);
    }

    let $episode = Number($input_episode.value);
    const $input_presentation = document.querySelector(`#episode${$id}`);

    if ($type === 'atual') {
        if ($operation === 'plus' && $episode < $episode_other) {
            $input_episode.value = $episode + 1;
            $episode++;
        } else if ($operation === 'dash' && $episode > 0) {
            $input_episode.value = $episode - 1;
            $episode--;
        }
        $input_presentation.value = `Episódios: ${$episode}/${$episode_other}`;
    } else if ($type === 'tot') {
        if ($operation === 'plus') {
            $input_episode.value = $episode + 1;
            $episode++;
        } else if ($operation === 'dash' && $episode > 0 && $episode > $episode_other) {
            $input_episode.value = $episode - 1;
            $episode--;
        }
        
        $input_presentation.value = `Episódios: ${$episode_other}/${$episode}`;
    }
    submitEpisode($id, $episode, $type, $name, $operation);
}

const submitEpisode = ($id, $episode, $type, $name, $operation) => {
    const $form_data = new FormData();
    $form_data.append('id', $id);
    $form_data.append('episode', $episode);
    $form_data.append('type', $type);
    $form_data.append('name', $name);
    $form_data.append('operation', $operation);
    $form_data.append('id_user', $id_user);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };

    fetch(`${$urlServer}api/edit.php`, $options);
}

// Funções

const changePage = $page => {
    if ($page === $list) {
        $list.setAttribute('style', 'display: none;')
        $loading.removeAttribute('style');
    } else if ($page === $edit) {
        $edit.setAttribute('style', 'display: none;')
        $list.removeAttribute('style')
    }
}

const floating_screen = $callback => {
    $confirm_body.removeAttribute('style');
    
    $button_not_confirm.addEventListener('click', () => {
        $confirm_body.setAttribute('style', 'display: none;')
    })

    $button_confirm.addEventListener('click', () => {
        $confirm_body.setAttribute('style', 'display: none;');
        $callback();
    })
}

// Funções Evento

const finish = ($id, $type_finish) => {

    if ($type_finish === 'finish') {
        $titulo_confirm.innerText = `Certeza que deseja finalizar?`;
        floating_screen(() => {
            const $form_data = new FormData();
            $form_data.append('id', $id);
            $form_data.append('type_finish', $type_finish);
        
            const $options = {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                body: $form_data
            }
        
            fetch(`${$urlServer}api/finish.php`, $options);
        
            setFinish($id, $type_finish)
        })
    } else if ($type_finish === 'restart') {
        $titulo_confirm.innerText = `Deseja recomeçar?`;
        floating_screen(() => {
            const $form_data = new FormData();
            $form_data.append('id', $id);
            $form_data.append('type_finish', $type_finish);
        
            const $options = {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                body: $form_data
            }
        
            fetch(`${$urlServer}api/finish.php`, $options);
        
            setFinish($id, $type_finish)
        })
    }
}

const setFinish = ($id, $type_finish) => {
    const $label = document.querySelector(`#label${$id}`);
    if ($type_finish === 'finish') {
        finish_finish($id, $label);
    } else if ($type_finish === 'restart') {
        finish_restart($id, $label);
    }
}

const finish_finish = ($id, $label) => {
    const $type = 'atual';
    const $episode_label = document.querySelector(`#episode${$id}`);
    const $btn_change = document.querySelector(`#btn_change${$id}`);
    const $input_episode_atual = document.querySelector('#input_atual');
    const $episode_tot = Number(document.querySelector('#input_tot').value);
    const $buttons = document.querySelectorAll('.button_episode');
    $button_finish.innerText = 'Recomeçar';
    $button_finish.setAttribute('class', `status_edit status1`);
    $button_finish.setAttribute('onclick', `finish(${$id}, 'restart')`);
    $btn_change.setAttribute('style', 'display: none;')
    $input_episode_atual.value = $episode_tot;
    $episode_label.value = `Episódios: ${$episode_tot}/${$episode_tot}`;
    $label.setAttribute('class', 'status3');
    $label.innerText = 'Finalizado';
    $buttons.forEach($button => {
        $button.setAttribute('disabled', '');
    });
    submitEpisode($id, $episode_tot, $type);
}

const finish_restart = ($id, $label) => {
    const $buttons = document.querySelectorAll('.button_episode');
    const $footer = document.querySelector(`#footer${$id}`);
    const $button_deactivate = 
    `<span id="label${$id}" class="status1">Assistindo</span>
    <button id="btn_change${$id}" class='button_change button_deactivate status2' onclick='deactivate(${$id}, "deactivate");'>Desativar</button>`;
    $footer.innerHTML = $button_deactivate;
    $button_finish.innerText = 'Finalizar';
    $button_finish.setAttribute('class', `status_edit status3`);
    $button_finish.setAttribute('onclick', `finish(${$id}, 'finish')`);
    $label.setAttribute('class', 'status1');
    $label.innerText = 'Assistindo';
    $buttons.forEach($button => {
        $button.removeAttribute('disabled');
    });
}

const edit = $id => {
    changePage($list);
    const $options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    getData($options, $id);
}

// Funções Montar Página

const getData = ($options, $id) => {
    fetch(`${$urlServer}api/assis.php?id=${$id}`, $options)
        .then($response => {
            $response.json()
                .then($itens => {
                    setData($itens);
                })
        })
}

const setData = $data => {
    const $status = Number($data.status);
    var $status_text = 'Finalizar';
    var $status_class = 'status_edit status3';
    var $status_function = 'finish';

    let $buttons = document.querySelectorAll('.button_episode');
    $buttons.forEach($button => {
        $button.removeAttribute('disabled');
    });

    if ($status === 3) {
        var $status_text = 'Recomeçar';
        var $status_class = 'status_edit status1'
        var $status_function = 'restart';
        let $buttons = document.querySelectorAll('.button_episode');
        $buttons.forEach($button => {
            $button.setAttribute('disabled', '');
        });
    }

    $button_finish.innerText = $status_text;
    $button_finish.setAttribute('class', `${$status_class}`)
    $button_finish.setAttribute('onclick', `finish(${$data.id}, '${$status_function}')`)
    $button_trash.setAttribute('onclick', `del(${$data.id}, '${$data.nome_id}', '${$data.nome}')`)
    $loading.setAttribute('style', 'display: none;')
    $title_edit.innerHTML = `${$data.nome}`;
    $capa_editar.setAttribute('src', `${$urlServer}images/${$user_actual}/${$data.nome_id}.jpg`)
    $nome.value = $data.nome;
    $nome_id.value = $data.nome_id;
    $nome_id.setAttribute('key', $data.id);
    $ep_atual.value = $data.ep_atual;
    $ep_tot.value = $data.ep_tot;
    $btn_atual_plus.setAttribute('onclick', `changeEpisode("atual", ${$data.id}, "plus", "${$data.nome}")`);
    $btn_atual_dash.setAttribute('onclick', `changeEpisode("atual", ${$data.id}, "dash", "${$data.nome}")`);
    $btn_tot_plus.setAttribute('onclick', `changeEpisode("tot", ${$data.id}, "plus", "${$data.nome}")`);
    $btn_tot_dash.setAttribute('onclick', `changeEpisode("tot", ${$data.id}, "dash", "${$data.nome}")`);
    $edit.removeAttribute('style');
}