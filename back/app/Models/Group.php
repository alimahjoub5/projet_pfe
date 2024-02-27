<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = 'groups';

    protected $fillable = ['name', 'description'];

    public function users()
    {
        return $this->hasMany(UserTechnicianGroup::class, 'GroupID');
    }
}
