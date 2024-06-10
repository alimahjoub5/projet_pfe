<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TechnicianGroup;
use App\Models\Priority;
use App\Models\EquipmentType;
use App\Models\User;
use App\Models\Societe;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets';
    protected $primaryKey = 'TicketID';
    public $timestamps = true; // Use Laravel's timestamps feature

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
        'TicketType',
        'ClosedDate',
        'StatusValidation',
        'datepriseencharge',
        'datedereparage',
        'datedevalidation'
    ];

    protected $dates = [
        'CreatedOn',
        'ModifiedOn',
        'StartDate',
        'ClosedDate',
        'datepriseencharge',
        'datedereparage',
        'datedevalidation'
    ];

    // Relationships
    public function technicianGroup()
    {
        return $this->belongsTo(TechnicianGroup::class, 'GroupID');
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'PriorityID');
    }

    public function equipmentType()
    {
        return $this->belongsTo(EquipmentType::class, 'EquipmentTypeID');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'AssigneeID'); // Single user assignment
    }

    public function societe()
    {
        return $this->belongsTo(Societe::class, 'SocieteID'); // Single societe assignment
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'CreatedBy'); // User who created the ticket
    }

     /**
     * Calculate the downtime duration for the ticket.
     *
     * @return int Duration in minutes
     */
    public function getDowntimeDuration()
    {
        if ($this->ClosedDate && $this->StartDate) {
            $startDate = Carbon::parse($this->StartDate);
            $closedDate = Carbon::parse($this->datedevalidation);
            return $startDate->diffInMinutes($closedDate);
        }
        return 0;
    }

}
