<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assis Escolhido</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div>
    <h1><img src="imagens/interrogacao.jpg" alt="Capa" class="capa"></h1>    
    <h2 id="titulo"></h2>
    <p id="ep_atual"></p>
    <p id="ep_tot"></p>
    </div>

    <form action="php/confirmar.php" method="get">
        <input id="nome_id" style="display: none" type="text" name="assis" value="">
        <input id="sort" type="button" value="Sortear">
        <input type="submit" value="Confirmar">
    </form>

    <script src="js/sort.js"></script>
</body>
</html>