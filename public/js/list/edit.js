// Título
const $title_edit = document.querySelector('#title_edit');
const $titulo_confirm = document.querySelector('#titulo_confirm');
const $capa_editar = document.querySelector('#capa_editar');
// Divs
const $list = document.querySelector('#list');
const $edit = document.querySelector('#edit');
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

const changePage = $page => {
    if ($page === $list) {
        $list.setAttribute('style', 'display: none;')
        $loading.removeAttribute('style');
    } else if ($page === $edit) {
        $edit.setAttribute('style', 'display: none;')
        $list.removeAttribute('style')
    }
}

$confirm_edit_image.addEventListener('click', () => {
    const $capa_load = $input_edit_image.files[0];
    const $nome_id_value = document.querySelector('#nome_id').value
    
    const $formData = new FormData();
    $formData.append('capa', $capa_load);
    $formData.append('nome_id', $nome_id_value);

    $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
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

const finish = ($id, $type) => {
    const $formData = new FormData();
    $formData.append('id', $id);
    $formData.append('type', $type);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
    }

    fetch(`${$urlServer}api/finish.php`, $options);

    setFinish($id, $type);
}

const setFinish = ($id, $type) => {
    const $label = document.querySelector(`#label${$id}`);

    if ($type === 'finish') {
        const $btn_change = document.querySelector(`#btn_change${$id}`);
        $button_finish.innerText = 'Recomeçar';
        $button_finish.setAttribute('class', `status_edit status1`);
        $button_finish.setAttribute('onclick', `finish(${$id}, 'restart')`);
        $label.setAttribute('class', 'status3');
        $label.innerText = 'Finalizado';
        $btn_change.setAttribute('style', 'display: none;')
    } else if ($type === 'restart') {
        $button_finish.innerText = 'Finalizar';
        $button_finish.setAttribute('class', `status_edit status3`);
        $button_finish.setAttribute('onclick', `finish(${$id}, 'finish')`);
        $label.setAttribute('class', 'status1');
        $label.innerText = 'Assistindo';
    }
}

const setData = $data => {
    const $status = Number($data.status);
    var $status_text = 'Finalizar';
    var $status_class = 'status_edit status3';
    var $status_function = 'finish';

    if ($status === 3) {
        var $status_text = 'Recomeçar';
        var $status_class = 'status_edit status1'
        var $status_function = 'restart';
    }

    $button_finish.innerText = $status_text;
    $button_finish.setAttribute('class', `${$status_class}`)
    $button_finish.setAttribute('onclick', `finish(${$data.id}, '${$status_function}')`)

    $titulo_confirm.innerText = `Deseja excluir ${$data.nome}?`;
    $button_trash.setAttribute('onclick', `del(${$data.id}, '${$data.nome_id}')`)
    $loading.setAttribute('style', 'display: none;')
    $title_edit.innerHTML = `${$data.nome}`;
    $capa_editar.setAttribute('src', `${$urlServer}images/${$data.nome_id}.jpg`)
    $nome.value = $data.nome;
    $nome_id.setAttribute('value', $data.nome_id);
    $nome_id.setAttribute('key', $data.id);
    $ep_atual.setAttribute('value', $data.ep_atual);
    $ep_tot.setAttribute('value', $data.ep_tot);
    $btn_atual_plus.setAttribute('onclick', `changeEpisode("atual", ${$data.id}, "plus")`);
    $btn_atual_dash.setAttribute('onclick', `changeEpisode("atual", ${$data.id}, "dash")`);
    $btn_tot_plus.setAttribute('onclick', `changeEpisode("tot", ${$data.id}, "plus")`);
    $btn_tot_dash.setAttribute('onclick', `changeEpisode("tot", ${$data.id}, "dash")`);
    $edit.removeAttribute('style');
}

const getData = ($nome_id, $options) => {
    fetch(`${$urlServer}api/assis.php?assis=${$nome_id}`, $options)
        .then($response => {
            $response.json()
                .then($itens => {
                    setData($itens);
                })
        })
}

const edit = $nome_id => {
    changePage($list);
    const $options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    getData($nome_id, $options);
}

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

$nome.addEventListener('input', () => {
    $nome_id.setAttribute('value', removeCharacters($nome.value));
    const $id = $nome_id.getAttribute('key');
    const $nome_value = $nome.value;
    const $img_capa = document.querySelector(`#img_capa${$id}`);
    $img_capa.setAttribute('onclick', `edit('${$nome_id.value}')`);
    $formData = new FormData();
    $formData.append('nome', $nome_value);
    $formData.append('nome_id', $nome_id.value);
    $formData.append('id', $id)

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
    }
    submitName($options, $id, $nome_value);
})

const changeEpisode = ($type, $id, $operation) => {
    if ($type === 'atual') {
        var $input_episode = document.getElementById(`input_atual`);
        var $episode_other = Number(document.getElementById(`input_tot`).value);
    } else if ($type === 'tot') {
        var $input_episode = document.getElementById(`input_tot`);
        var $episode_other = Number(document.getElementById(`input_atual`).value);
    }

    let $episode = Number($input_episode.getAttribute('value'));
    const $input_presentation = document.querySelector(`#episode${$id}`);
    console.log($input_presentation);

    if ($type === 'atual') {
        if ($operation === 'plus' && $episode < $episode_other) {
            $input_episode.setAttribute('value', $episode + 1);
            $episode++;
        } else if ($operation === 'dash' && $episode > 0) {
            $input_episode.setAttribute('value', $episode - 1);
            $episode--;
        }
        $input_presentation.value = `Episódios: ${$episode}/${$episode_other}`;
    } else if ($type === 'tot') {
        if ($operation === 'plus') {
            $input_episode.setAttribute('value', $episode + 1);
            $episode++;
        } else if ($operation === 'dash' && $episode > 0 && $episode > $episode_other) {
            $input_episode.setAttribute('value', $episode - 1);
            $episode--;
        }
        $input_presentation.value = `Episódios: ${$episode_other}/${$episode}`;
    }

    const $formData = new FormData();
    $formData.append('id', $id);
    $formData.append('episode', $episode);
    $formData.append('type', $type);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
    };

    fetch(`${$urlServer}api/edit.php`, $options);
}