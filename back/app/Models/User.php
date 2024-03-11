<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable;

class User extends Model implements JWTSubject, Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'UserID';
    public $timestamps = false;

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
        'Active' => 'boolean',
        'CreatedOn' => 'datetime',
        'ModifiedOn' => 'datetime',
    ];


    public function technicianGroups()
    {
        return $this->hasMany(UserTechnicianGroup::class, 'UserID');
    }

    // Implement methods for Authenticatable interface
    public function getAuthIdentifierName()
    {
        return 'UserID';
    }

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }

    // JWTSubject methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
