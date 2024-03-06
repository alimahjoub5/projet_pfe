<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements JWTSubject
{
    use HasFactory;

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

    public function technicianGroups()
    {
        return $this->hasMany(UserTechnicianGroup::class, 'UserID');
    }

    use Notifiable;

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
