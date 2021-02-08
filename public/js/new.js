const $nome = document.querySelector('#nome');
const $nome_id = document.querySelector('#nome_id');
const $ep_atual = document.querySelector('#ep_atual');
const $ep_tot = document.querySelector('#ep_tot');
const $buttonAdd = document.querySelector('#add');
const $file = document.querySelector('#image');

const removeCharacters = ($string) => {
    $string = $string.normalize("NFD").replace(/[^0-9a-zA-Zs]/g, "");
    return $string;
}

$nome.addEventListener('input', () => {
    $nome_id.value = removeCharacters($nome.value);
})

$buttonAdd.addEventListener('click', () => {
    const $form_data = new FormData();
    $form_data.append('nome', $nome.value);
    $form_data.append('nome_id', $nome_id.value);
    $form_data.append('ep_atual', $ep_atual.value);
    $form_data.append('ep_tot', $ep_tot.value);
    $form_data.append('capa', $file.files[0]);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };

    fetch(`${$urlServer}api/new.php`, $options)
    .then($response => {
        if($response.status == 200){
            window.location.href = `${$url}pages/confirm.html`;
        } else {
            throw response.status;
        }
    });
});