<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentType extends Model
{
    use HasFactory;

    protected $table = 'equipment_types';
    protected $primaryKey = 'EquipmentTypeID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'TypeName',
        'Description',
        'Manufacturer',
        'ModelNumber',
        'SerialNumber',
        'InstallationDate',
        'WarrantyExpiration',
        'MaintenanceInterval',
        'LastMaintenanceDate',
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
    ];

    protected $dates = [
        'InstallationDate',
        'WarrantyExpiration',
        'LastMaintenanceDate',
        'CreatedOn',
        'ModifiedOn',
    ];


    public function stockPieces()
    {
        return $this->hasMany(StockPiece::class, 'equipment_id');
    }
    // Relations éventuelles à définir ici
}
