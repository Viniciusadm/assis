// const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
// const $url = 'http://assis.surge.sh/';
const $url = 'http://localhost:8000/'
const $urlServer = 'http://localhost:8001/';
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
    const $formData = new FormData();
    $formData.append('nome', $nome.value);
    $formData.append('nome_id', $nome_id.value);
    $formData.append('ep_atual', $ep_atual.value);
    $formData.append('ep_tot', $ep_tot.value);
    $formData.append('capa', $file.files[0]);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $formData
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