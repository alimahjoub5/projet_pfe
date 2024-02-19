<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'FirstName', 'LastName', 'Email', 'Username', 'Password', 'Role', 'Active', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'
    ];

    protected $casts = [
        'Active' => 'boolean', // Cast 'Active' to boolean
    ];

    // Relation vers le modèle Role
    public function role()
    {
        return $this->belongsTo(Role::class, 'Role', 'name');
    }
}
