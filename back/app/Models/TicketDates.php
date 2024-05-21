<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketDates extends Model
{
    use HasFactory;

    protected $table = 'ticket_dates';
    protected $primaryKey = 'DateID';

    protected $fillable = [
        'TicketID',
        'datepriseencharge',
        'datedereparage',
        'datedevalidation',
    ];

    // Relation avec Ticket
    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'TicketID', 'TicketID');
    }
}
