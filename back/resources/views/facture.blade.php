<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bon de Commande</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
        }
        .header, .footer {
            text-align: center;
            padding: 10px 0;
        }
        .header {
            border-bottom: 1px solid #000;
        }
        .footer {
            border-top: 1px solid #000;
        }
        .content {
            margin: 20px 0;
        }
        .content table {
            width: 100%;
            border-collapse: collapse;
        }
        .content table, .content th, .content td {
            border: 1px solid #000;
        }
        .content th, .content td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bon de Commande</h1>
            <p><strong>Nom de l'entreprise :</strong>ISET SOUSSE</p>
            <p><strong>Adresse :</strong> Cité Erriadh - B.P. 135 - 4023 </p>
            <p><strong>Téléphone :</strong> 73 307 960</p>
            <p><strong>Email :</strong>admin@isetso.rnu.tn</p>
            <p><strong>Site Web :</strong>https://isetso.rnu.tn</p>
        </div>

        <div class="content">
            <p><strong>Numéro de commande :</strong> {{ $numero_commande }}</p>
            <p><strong>Date de commande :</strong> {{ $date }}</p>

            <h2>Informations du fournisseur</h2>
            <p><strong>Nom du fournisseur :</strong> {{ $fournisseur }}</p>

            <h2>Description de la commande</h2>
            <table>
                <tr>
                    <th>Nom de la pièce</th>
                    <th>Quantité</th>
                    <th>Date de livraison prévue</th>
                </tr>
                <tr>
                    <td>{{ $nom_piece }}</td>
                    <td>{{ $quantite }}</td>
                    <td>{{ $expected_delivery_date }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>Merci de votre commande !</p>
        </div>
    </div>
</body>
</html>
