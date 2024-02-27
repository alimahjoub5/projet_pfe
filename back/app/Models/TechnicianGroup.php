<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnicianGroup extends Model
{
    use HasFactory;

    protected $table = 'technician_groups';
    protected $primaryKey = 'GroupID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

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
}
