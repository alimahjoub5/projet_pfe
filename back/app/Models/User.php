<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AuthenticatableUser;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends AuthenticatableUser implements Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'UserID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'FirstName',
        'LastName',
        'Email',
        'Username',
        'Password',
        'Role',
        'Active',
        'CreatedOn',
        'CreatedBy',
        'ModifiedOn',
        'ModifiedBy',
    ];
    

    protected $casts = [
        'Active' => 'boolean', // Cast la colonne Active en boolean
        'CreatedOn' => 'datetime',
        'ModifiedOn' => 'datetime',
    ];

    /**
     * Récupère le mot de passe haché de l'utilisateur.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->Password;
    }

    public function technicianGroups()
    {
        return $this->hasMany(UserTechnicianGroup::class, 'UserID');
    }

}
