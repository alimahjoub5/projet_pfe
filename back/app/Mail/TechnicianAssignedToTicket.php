<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TechnicianAssignedToTicket extends Mailable
{
    use Queueable, SerializesModels;

    public $ticket;
    public $technician;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($ticket, $technician)
    {
        $this->ticket = $ticket;
        $this->technician = $technician;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Technician Assigned to Ticket')
                    ->markdown('emails.technician_assigned_to_ticket');
    }
}
