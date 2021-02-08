const $url = 'http://assis.surge.sh/';
const $urlServer = 'http://viniciusadm.000webhostapp.com/assis/';
// const $url = 'http://localhost:8000/';
// const $urlServer = 'http://localhost:8001/';
const $button_exit = document.querySelector('#button_exit');
const $user = document.querySelector('#user');

if (localStorage.getItem('name') === null) {
    window.location.href = `${$url}pages/login.html`;
} else if (localStorage.getItem('name') !== null) {
    $name = localStorage.getItem('name');
    $user.innerHTML = `Usuário: ${$name}`;
}

$button_exit.addEventListener('click', () => {
    localStorage.removeItem('name');
    window.location.href = `${$url}pages/login.html`;
})