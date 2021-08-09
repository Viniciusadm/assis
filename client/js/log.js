const $date_input = document.querySelector('#date_input');
const $logs_div = document.querySelector('#logs_div');
const $head = document.querySelector('#head');
const now = new Date();
const $year = now.getFullYear();
let $month = String(now.getMonth() + 1);
let $day = String(now.getDate());
if ($month.length === 1) $month = 0 + $month
if ($day.length === 1) $day = 0 + $day
let $date = [$year, $month, $day];
$date = $date.join('-');

$date_input.value = $date;

$date_input.addEventListener('change', () => {
    const $date_value = $date_input.value;
    searchDate($date_value);
})

const delLog = $id => {
    const $log = document.querySelector(`#log${$id}`).lastChild;
    if ($log.innerText === 'Excluir') $log.innerText = 'Tem certeza?';
    else if ($log.innerText === 'Tem certeza?') delLogBD($id);
}

const delLogBD = $id => {
    const $form_data = new FormData();
    $form_data.append('id', $id);

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    }

    fetch(`${$urlServer}api/delLog.php`, $options)
        .then($response => {
            if($response.status == 200) document.location.reload();;
        })
}

const searchDate = $date_value => {
    const $form_data = new FormData();
    $form_data.append('date', $date_value);
    $form_data.append('id_user', $id_user)

    const $options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: $form_data
    }

    fetch(`${$urlServer}api/log.php`, $options)
        .then($response => {
            $response.json()
                .then($data => {
                    mountPage($data)
                })
        }
)}

const mountPage = $logs => {
    if ($logs === 'not_assis') {
        $logs_div.innerHTML = '<p id="err">Nada encontrado</p>'
        $head.innerHTML = '';
    } else if ($logs !== 'not_assis') {
        let $content_head = '';
        let $content = '';
        $logs.forEach(($log, $index) => {
            if ($index === 0) {
                $content_head += `<div id="inhead"><p>${$log.count_today} episódios</p>`;
            } else if ($index === 1) {
                $content_head += `<p>${$log.count} episódios totais</p></div>`
            } else if ($index > 1) {
                $content += `<div class="log" id="log${$log.id}"><p>${$log.occurrence}</p> <p>Horário: ${$log.time}</p><p onclick="delLog(${$log.id})" class="del">Excluir</p></div>`
            }
        });
        $head.innerHTML = $content_head;
        $logs_div.innerHTML = $content;
    }
}

searchDate($date_input.value);