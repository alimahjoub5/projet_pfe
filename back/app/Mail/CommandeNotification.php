<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class CommandeNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $details;
    public $pdfPath;

    public function __construct($details, $pdfPath)
    {
        $this->details = $details;
        $this->pdfPath = $pdfPath;
    }

    public function build()
    {
        $pdfFileName = pathinfo($this->pdfPath, PATHINFO_BASENAME);
        $pdfContents = Storage::get($this->pdfPath);

        return $this->subject('Demande de pièces de rechange pour équipement')
                    ->view('emails.commande-notification')
                    ->attachData($pdfContents, $pdfFileName, [
                        'mime' => 'application/pdf',
                    ]);
    }
}
