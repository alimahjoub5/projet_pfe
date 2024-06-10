@component('mail::message')
# Technicien Assigné au Ticket

Bonjour,

Nous tenons à vous informer qu'un technicien a été assigné au ticket suivant :

**Ticket ID:** #{{ $ticket->TicketID }}  
**Titre du Ticket:** {{ $ticket->Subject }}

**Description du Ticket:**  
{{ $ticket->Description }}

---

**Technicien assigné :**
- **Nom:** {{ $technician->LastName . ' ' . $technician->FirstName }}
- **Email:** {{ $technician->Email }}

Veuillez prendre note de cette assignation et collaborer avec le technicien assigné pour résoudre ce ticket dans les plus brefs délais.

De plus, veuillez consulter votre compte pour toute information supplémentaire ou mise à jour concernant ce ticket.

Merci pour votre attention.

Cordialement,  
L'équipe de {{ config('app.name') }}
@endcomponent
