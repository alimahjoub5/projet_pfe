<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande de pièces de rechange pour équipement</title>
</head>
<body>
    <p>Bonjour,</p>

    <p>Nous vous contactons pour vous informer que nous avons récemment passé une commande pour des pièces de rechange pour notre équipement. Voici les détails de la commande :</p>

    <ul>
        <li><strong>Nom de la pièce commandée :</strong> {{ $details['nom_piece'] }}</li>
        <li><strong>date livraison prevue :</strong> {{ $details['date_livraison_prevue'] }}</li>
        <li><strong>Total de la commande :</strong> {{ $details['total_commande'] }} €</li>
    </ul>

    <p>Nous vous prions de bien vouloir traiter cette commande dans les plus brefs délais et de nous tenir informés de l'état d'avancement de la livraison.</p>

    <p>Si vous avez besoin de plus amples informations ou si vous avez des questions, n'hésitez pas à nous contacter.</p>

    <p>Cordialement,</p>
    <p>Votre nom ou le nom de votre entreprise</p>
</body>
</html>
