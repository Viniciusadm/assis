const $confirm_body = document.querySelector('#confirm_body');
const $button_trash = document.querySelector('#trash');
const $button_not_confirm = document.querySelector('#button_not_confirm');
const $button_confirm = document.querySelector('#button_confirm');

const del = ($id, $nome_id, $nome) => {
    $titulo_confirm.innerText = `Deseja excluir ${$nome}?`;
    floating_screen(() => {
        delDataBase($id, $nome_id);
        removeAssis($id)
        changePage($edit);
    })
}

const removeAssis = $id => {
    const $assis_card = document.querySelector(`#assis_card${$id}`);
    $assis_card.setAttribute('style', 'display: none;')
}

const delDataBase = ($id, $nome_id) => {
    const $form_data = new FormData();
    $form_data.append('id', $id)
    $form_data.append('nome_id', $nome_id)

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    }

    fetch(`${$urlServer}api/del.php`, $options)
}