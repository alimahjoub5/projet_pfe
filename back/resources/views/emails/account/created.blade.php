@component('mail::message')
# Bienvenue dans notre système de GMAO

Bonjour {{ $user->FirstName }},

Votre compte a été créé avec succès dans notre système de GMAO. Voici vos informations de connexion :

- **Nom d'utilisateur:** {{ $user->Username }}
- **Mot de passe:** {{ $password }}
- **E-mail de login:** {{ $user->Email }}

Vous pouvez vous connecter en utilisant votre nom d'utilisateur et votre mot de passe. Assurez-vous de le garder en sécurité.

@component('mail::button', ['url' => ''])
Se connecter
@endcomponent

Merci,<br>
L'équipe de GMAO SYSTEMS

@component('mail::footer')
    Vous recevez cet e-mail car votre compte a été créé dans notre système de GMAO. Si vous n'avez pas créé ce compte, veuillez contacter l'administrateur.
@endcomponent
@endcomponent
