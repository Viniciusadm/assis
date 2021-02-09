// const $url = 'http://assis.surge.sh/';
// const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
const $url = 'http://localhost:8000/';
const $urlServer = 'http://localhost:8001/';
const $button_confirm = document.querySelector('#button_confirm');

if (localStorage.getItem('name') !== null) {
    window.location.href = $url;
}

const validation = $user => {
    if ($user === 'not_user') {
        alert('Usuário não encontrado');
    } else if ($user !== 'not_user') {
        localStorage.setItem('name', $user['name']);
        localStorage.setItem('user', $user['user']);
        getId($user['user']);
        window.location.href = $url;
    }
}

const getId = $user => {
    const $form_data = new FormData();
    $form_data.append('user', $user);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    };

    fetch(`${$urlServer}api/id.php`, $options)
        .then($response => { $response.json()
        .then($id => {
            localStorage.setItem('id', $id['id']);
        })
    })
}

$button_confirm.addEventListener('click', () => {
    const $input_user = document.querySelector('#input_user').value;

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
})
