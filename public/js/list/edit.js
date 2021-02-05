// Título
const $title_edit = document.querySelector('#title_edit');
const $capa_editar = document.querySelector('#capa_editar');
// Divs
const $list = document.querySelector('#list');
const $edit = document.querySelector('#edit');
// Inputs
const $nome = document.querySelector('#nome');
const $nome_id = document.querySelector('#nome_id');
const $ep_atual = document.querySelector('.ep_atual');
const $ep_tot = document.querySelector('.ep_tot');
// Botões
const $btn_atual_plus = document.querySelector('#btn_atual_plus');
const $btn_atual_dash = document.querySelector('#btn_atual_dash');
const $btn_tot_plus = document.querySelector('#btn_tot_plus');
const $btn_tot_dash = document.querySelector('#btn_tot_dash');
const $button_voltar_edit = document.querySelector('#button_voltar_edit');

// const sendToBank = ()

const changePage = $page => {
    if ($page === $list) {
        $list.setAttribute('style', 'display: none;')
        // $edit.removeAttribute('style')
        $loading.removeAttribute('style');
    } else if ($page === $edit) {
        $edit.setAttribute('style', 'display: none;')
        $list.removeAttribute('style')
    }
}

$button_voltar_edit.addEventListener('click', () => {
    changePage($edit);
})

const setData = $data => {
    $loading.setAttribute('style', 'display: none;')
    $title_edit.innerHTML = `${$data.nome}`;
    $capa_editar.setAttribute('src', `${$urlServer}images/${$data.nome_id}.jpg`)
    $nome.setAttribute('value', $data.nome);
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

const submitName = $options => {
    fetch(`${$urlServer}api/edit.php`, $options)
}

$nome.addEventListener('input', () => {
    $nome_id.setAttribute('value', removeCharacters($nome.value));
    $formData = new FormData();
    $formData.append('nome', $nome.value);
    $formData.append('nome_id', $nome_id.value);
    $formData.append('id', $nome_id.getAttribute('key'))

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
    }
    submitName($options);
})

const episodeFinished = ($episode, $episode_other) => {
    if ($episode === $episode_other) {
        alert('Assis finalizado?');
    }
}

const changeEpisode = ($type, $id, $operation) => {
    if ($type === 'atual') {
        var $input_episode = document.getElementById(`input_atual`);
        var $episode_other = Number(document.getElementById(`input_tot`).value);
    } else if ($type === 'tot') {
        var $input_episode = document.getElementById(`input_tot`);
        var $episode_other = Number(document.getElementById(`input_atual`).value);
    }

    let $episode = Number($input_episode.getAttribute('value'));

    if ($type === 'atual') {
        if ($operation === 'plus' && $episode < $episode_other) {
            $input_episode.setAttribute('value', $episode + 1);
            $episode++;
            episodeFinished($episode, $episode_other);
        } else if ($operation === 'dash' && $episode > 0) {
            $input_episode.setAttribute('value', $episode - 1);
            $episode--;
        }
    } else if ($type === 'tot') {
        if ($operation === 'plus') {
            $input_episode.setAttribute('value', $episode + 1);
            $episode++;
            episodeFinished($episode, $episode_other);
        } else if ($operation === 'dash' && $episode > 0 && $episode > $episode_other) {
            $input_episode.setAttribute('value', $episode - 1);
            $episode--;
        }
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