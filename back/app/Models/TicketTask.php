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
        'StatusCodeID',
        'AssigneeID',
        'Subject',
        'Description',
        'PriorityID',
        'DueDate',
        'StartDate',
        'EndDate',
        'CompletedDate',
    ];

    protected $dates = [
        'CreatedOn',
        'ModifiedOn',
        'DueDate',
        'StartDate',
        'EndDate',
        'CompletedDate',
    ];

    // Relations éventuelles à définir ici
}
