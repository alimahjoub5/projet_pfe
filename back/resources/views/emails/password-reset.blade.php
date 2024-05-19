<!DOCTYPE html>
<html>
<head>
    <title>Réinitialisation de votre mot de passe</title>
</head>
<body>
    <p>Bonjour {{ $user->FirstName }},</p>
    <p>Votre mot de passe a été réinitialisé. Voici votre nouveau mot de passe :</p>
    <p><strong>{{ $newPassword }}</strong></p>
    <p>Merci,</p>
    <p>L'équipe de support</p>
</body>
</html>
