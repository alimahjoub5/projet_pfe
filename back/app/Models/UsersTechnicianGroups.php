<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersTechnicianGroups extends Model
{
    use HasFactory;

    protected $table = 'users_technician_groups';
    protected $primaryKey = null; // Aucune clé primaire définie car il s'agit d'une table de liaison
    public $incrementing = false; // Pas d'incrémentation automatique des clés primaires
    public $timestamps = false; // Pas de colonnes `created_at` et `updated_at`

    protected $fillable = [
        'UserID',
        'GroupID',
    ];

    // Vous pouvez ajouter des relations ici si nécessaire
}
