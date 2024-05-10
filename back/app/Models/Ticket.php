<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TechnicianGroup;
class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets';
    protected $primaryKey = 'TicketID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
        'StatusCodeID',
        'SocieteID',
        'AssigneeID',
        'Subject',
        'Description',
        'PriorityID',
        'GroupID',
        'EquipmentTypeID',
        'StartDate',
        'EndDate',
        'DueDate',
        'ClosedDate',
    ];

    protected $dates = [
        'CreatedOn',
        'ModifiedOn',
        'StartDate',
        'EndDate',
        'DueDate',
        'ClosedDate',
    ];

 
    // Relations éventuelles à définir ici
    // Relation avec le groupe
    public function TechnicianGroup()
    {
        return $this->belongsTo(TechnicianGroup::class, 'GroupID', 'GroupID'); // Assurez-vous que 'GroupID' correspond à la clé primaire de votre table de groupes
    }
    public function priority()
    {
        return $this->belongsTo(Priority::class, 'PriorityID');
    }

    public function equipmentType()
    {
        return $this->belongsTo(EquipmentType::class, 'EquipmentTypeID');
    }
    public function users()
    {
        return $this->belongsTo(User::class, 'AssigneeID'); // Si un ticket est associé à un seul utilisateur

    }
    public function Societe()
    {
        return $this->belongsTo(Societe::class, 'SocieteID'); // Si un ticket est associé à un seul utilisateur

    }
}
