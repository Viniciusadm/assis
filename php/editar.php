<?php
require_once "conexao.php";

$sql = "SELECT * FROM assis";

$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while($array = $result->fetch_assoc()) {
        $assis[$array['nome']] = [$array['id'], $array['nome'], $array['nome_id'], $array['ep_atual'], $array['ep_tot']]; 
    }
}

ksort($assis);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar</title>
    <link rel="stylesheet" href="editar.css">
</head>
<body>
    <form action="_editar.php" method="post">
        <div class="corpo">
            <?php foreach($assis as $assis): ?>
            <div class="assis-card" id="<?='assis' . $assis[0]?>">
                <h3 class="titulo"><?=$assis[1]?></h3>
                <div class="episodios">
                    <input class="episodio" type="text" name="<?=$assis[2]?>" id="<?='atual' . $assis[0]?>" value="<?=$assis[3]?>" disabled>
                    <input class="episodio" type="text" name="<?=$assis[2]?>" id="<?='tot' . $assis[0]?>" value="<?=$assis[4]?>" disabled>
                </div>
                <div class="botoes">
                    <button name="assis" value="<?=$assis[0]?>" class="botao" id="<?='btn'. $assis[0]?>" onclick="editar('atual', '<?=$assis[0]?>')">+</button>
                    <button name="assis" value="<?=$assis[0]?>" class="botao" id="<?='btn'. $assis[0]?>" onclick="editar('tot', '<?=$assis[0]?>')">+</button>
                </div>
            </div>
            <?php endforeach ?>
        </div>
    </form>
</body>

<script>
    function editar(episodio, id) {
        let divFantasma = document.createElement("input")
        divFantasma.setAttribute('name', 'tipo')
        divFantasma.setAttribute('value', episodio)
        let div = document.querySelector('.corpo')
        div.appendChild(divFantasma)
        let episodioAssis = document.getElementById(episodio + id)
        episodioAssis.removeAttribute("disabled")
    }
</script>

</html>