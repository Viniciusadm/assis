const $nome = document.querySelector('#nome');
const $episode = document.querySelector('#episode');
const $div_episode = document.querySelector('#div_episode');
const $type = document.querySelector('#type');
const $buttonAdd = document.querySelector('#add');
const $p_error = document.querySelector('#p_error');
const $img_loading = document.querySelector('#img_loading');
const $body = document.querySelector('#body');

const checkValues = () => {
    if ($nome.value && $episode.value && $type.value) {
        return true;
    } else {
        return false;
    }
}

$type.addEventListener('change', () => {
    console.log($type.value)
    if ($type.value === 'filme') $div_episode.setAttribute('style', 'display: none')
    else if ($type.value === 'serie') $div_episode.removeAttribute('style')
})

$buttonAdd.addEventListener('click', () => {
    if (checkValues() === true) {
        $body.setAttribute('style', 'display: none;')
        $img_loading.removeAttribute('style');
        const $form_data = new FormData();
        $form_data.append('nome', $nome.value);
        $form_data.append('episode', $episode.value);
        $form_data.append('type', $type.value);
        $form_data.append('episode', $episode.value);
        $form_data.append('id_user', $id_user);
    
        const $options = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: $form_data
        };
    
        fetch(`${$urlServer}api/direct.php`, $options)
        .then($response => {
            if($response.status == 200){
                window.location.href = `${$url}pages/confirm_new.html`;
            } else {
                throw response.status;
            }
        });
    } else if (checkValues() === false) {
        $p_error.innerText = 'Preencha todos os campos obrigatórios';
    }
});