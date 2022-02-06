// const $url = 'http://assis.surge.sh/';
// const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
const $url = 'http://localhost:8000/';
const $urlServer = 'http://localhost:8001/';
const $button_confirm = document.querySelector('#button_confirm');
const $p_error = document.querySelector('#p_error');

if (localStorage.getItem('name') !== null) {
    window.location.href = $url;
}

const validation = $user => {
    if ($user === 'not_user') {
        $p_error.innerText = 'Usuário não encontrado';
    } else if ($user !== 'not_user') {
        localStorage.setItem('name', $user['name']);
        localStorage.setItem('user', $user['user']);
        localStorage.setItem('id', $user['id']);
        window.location.replace($url);
    }
}

$button_confirm.addEventListener('click', () => {
    const $input_user = document.querySelector('#input_user').value;

    if ($input_user === '') {
        $p_error.innerText = 'Preencha o campo';
    } else if ($input_user !== undefined) {
        const $form_data = new FormData();
        $form_data.append('user', $input_user);
    
        const $options = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: $form_data
        }
    
        fetch(`${$urlServer}api/login.php`, $options)
            .then($response => {
                $response.json()
                    .then($user => {
                        validation($user);
                    })
            })
    }
})