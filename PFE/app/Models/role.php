<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name',
    ];

    // Relation vers le modèle User
    public function users()
    {
        return $this->hasMany(User::class, 'Role', 'name');
    }
}
