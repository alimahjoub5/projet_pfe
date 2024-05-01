<!DOCTYPE html>
<html>
<head>
    <title>Facture</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 2px solid #000;
            border-radius: 10px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .invoice-details table {
            width: 100%;
        }
        .invoice-details table td {
            padding: 5px;
            border: none;
        }
        .invoice-details table .title {
            font-size: 18px;
            font-weight: bold;
        }
        .items {
            margin-bottom: 20px;
        }
        .items table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .items table th,
        .items table td {
            padding: 10px;
            border: 1px solid #000;
            text-align: left;
        }
        .total {
            text-align: right;
            margin-top: 20px;
        }
        .total h3 {
            margin: 0;
            font-weight: bold;
            font-size: 20px;
        }
        .fournisseur-details,
        .delivery-details {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Facture</h2>
        </div>
        <div class="invoice-details">
            <table>
                <tr>
                    <td class="title">Numéro de facture:</td>
                    <td>{{ $numero_facture }}</td>
                </tr>
                <tr>
                    <td class="title">Date:</td>
                    <td>{{ $date }}</td>
                </tr>
            </table>
        </div>
        <div class="items">
            <h3>Détails de la facture:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $nom_piece }}</td>
                        <td>{{ $prix_unitaire }}</td>
                        <td>{{ $quantite }}</td>
                        <td>{{ $total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="fournisseur-details">
            <h3>Détails du fournisseur:</h3>
            <p>Nom du fournisseur: {{ $fournisseur }}</p>
        </div>
        <div class="delivery-details">
            <h3>Détails de la livraison:</h3>
            <p>Date de livraison prévue: {{ $expected_delivery_date }}</p>
        </div>
        <div class="total">
            <h3>Total: {{ $total }}</h3>
        </div>
    </div>
</body>
</html>
