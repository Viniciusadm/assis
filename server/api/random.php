<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$id_user = $_POST['id_user'];
$prop = $_POST['prop'];

$sql = "SELECT nome, ep_tot - ep_atual as missing FROM assis where ep_atual < ep_tot and status = 1 and id_user = $id_user order by missing;";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while($resultado = $result->fetch_assoc()) {
        $nomes[] = ['name' => $resultado['nome'], 'missing' => $resultado['missing']];
    }

    if ($prop == 'true') {
        $name = randomProp($nomes);
    } elseif ($prop == 'false') {
        $name = random($nomes);
    }

    $sql = "SELECT nome, nome_id, ep_atual, ep_tot FROM assis where nome = '$name' and id_user = $id_user;";
    $result = $connection->query($sql);
    $assis = $result->fetch_assoc();
} else {
    $assis = 'not_assis';
}

echo json_encode($assis);

function randomProp($nomes) {
    $tot = 0;

    foreach($nomes as $nome) {
        $tot += $nome['missing'];
    }

    $proportion = 100 / $tot;
    $cont = 0;

    foreach($nomes as $nome) {
        if ($cont === 0) {
            $prop = $nome['missing'] * $proportion;
            array_push($nomes[$cont], $prop);
        } elseif ($cont !== 0) {
            $prop_previous = $nomes[$cont - 1][0];
            $prop_current = $nome['missing'] * $proportion;
            $prop = $prop_current + $prop_previous;
            array_push($nomes[$cont], $prop);
        }
        $cont++;
    }

    $sort = mt_rand(1, 100);

    foreach($nomes as $key => $nome) {
        if ($key === 0) {
            $index_previous = 0;
            $index_current = $nomes[$key][0];
            if ($sort > $index_previous and $sort < $index_current) $choice = $key;
        } elseif($key > 0) {
            $index_previous = $nomes[$key - 1][0];
            $index_current = $nomes[$key][0];
            if ($sort > $index_previous and $sort < $index_current) $choice = $key;
        }
    }

    $name_choice = $nomes[$choice]['name'];
    return $name_choice;
}

function random($nomes) {
    $choice = array_rand($nomes, 1);
    $name_choice =  $nomes[$choice]['name'];
    return $name_choice;
}
