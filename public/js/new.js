const $nome = document.querySelector('#nome');
const $nome_id = document.querySelector('#nome_id');
const $ep_atual = document.querySelector('#ep_atual');
const $ep_tot = document.querySelector('#ep_tot');
const $buttonAdd = document.querySelector('#add');
const $file = document.querySelector('#input_image');
const $image_upload = document.querySelector('#image_upload');
const $input_image = document.querySelector('#input_image');
const $p_error = document.querySelector('#p_error');
const $img_loading = document.querySelector('#img_loading');
const $body = document.querySelector('#body');

const removeCharacters = ($string) => {
    $string = $string.normalize("NFD").replace(/[^0-9a-zA-Zs]/g, "");
    return $string;
}

const checkValues = () => {
    if ($nome.value && $ep_atual.value && $ep_tot.value) {
        return true;
    } else {
        return false;
    }
}

$input_image.addEventListener('change', () => {
    $image_upload.setAttribute('src', '../images/image-red.svg');
})

$nome.addEventListener('input', () => {
    $nome_id.value = removeCharacters($nome.value);
})

$buttonAdd.addEventListener('click', () => {
    if (checkValues() === true) {
        $body.setAttribute('style', 'display: none;')
        $img_loading.removeAttribute('style');
        const $form_data = new FormData();
        $form_data.append('nome', $nome.value);
        $form_data.append('nome_id', $nome_id.value);
        $form_data.append('ep_atual', $ep_atual.value);
        $form_data.append('ep_tot', $ep_tot.value);
        $form_data.append('capa', $file.files[0]);
        $form_data.append('id_user', $id_user);
        $form_data.append('user_actual', $user_actual);
    
        const $options = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: $form_data
        };
    
        fetch(`${$urlServer}api/new.php`, $options)
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