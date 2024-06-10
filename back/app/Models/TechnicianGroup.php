<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnicianGroup extends Model
{
    use HasFactory;

    protected $table = 'technician_groups';
    protected $primaryKey = 'GroupID';
    public $timestamps = false;

    protected $fillable = [
        'GroupName',
        'Description',
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
    ];

    protected $casts = [
        'CreatedOn' => 'datetime',
        'ModifiedOn' => 'datetime',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_technician_groups', 'GroupID', 'UserID');
    }
}
