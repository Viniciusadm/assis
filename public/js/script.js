// const $url = 'http://assis.surge.sh/';
// const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
const $url = 'http://localhost:8000/';
const $urlServer = 'http://localhost:8001/';
const $users = document.querySelectorAll('.user');
const $buttons_exit = document.querySelectorAll('.button_exit');

if (localStorage.getItem('name') === null) {
    window.location.href = `${$url}pages/login.html`;
} else if (localStorage.getItem('name') !== null) {
    $name = localStorage.getItem('name');
    $users.forEach($user => {
        $user.innerHTML = `Usuário: ${$name}`;
    });
}

$buttons_exit.forEach($button_exit => {
    $button_exit.addEventListener('click', () => {
        localStorage.removeItem('name');
        window.location.href = `${$url}pages/login.html`;
    })
});