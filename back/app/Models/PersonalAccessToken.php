<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    // Vous pouvez ajouter des méthodes supplémentaires ou des modifications ici
    public function user()
    {
        return $this->belongsTo(User::class, 'tokenable_id');
    }
}
