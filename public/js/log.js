const $date_input = document.querySelector('#date_input');
const $logs_div = document.querySelector('#logs_div');
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
        $logs_div.innerHTML = 'Nada encontrado'
    } else if ($logs !== 'not_assis') {
        let $content = '';
        $logs.forEach($log => {
            $content += `<p>${$log.occurrence}</p>
            <p>Horário: ${$log.time}</p>`;
        });
        $logs_div.innerHTML = $content;    
    }
}

searchDate($date_input.value);
