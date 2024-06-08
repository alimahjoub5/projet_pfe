<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketTask extends Model
{
    use HasFactory;

    protected $table = 'ticket_tasks';
    protected $primaryKey = 'TicketTaskID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'TicketID',
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
        'AssigneeID',
        'Subject',
        'Description',
        'DueDate',
        'StartDate',
        'EndDate',
    ];

    protected $dates = [
        'CreatedOn',
        'ModifiedOn',
        'DueDate',
        'StartDate',
        'EndDate',
        'CompletedDate',
    ];

    // Relations
    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'TicketID', 'TicketID');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'AssigneeID'); // Affectation d'un seul utilisateur
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'CreatedBy'); // Utilisateur ayant créé la tâche
    }
}

