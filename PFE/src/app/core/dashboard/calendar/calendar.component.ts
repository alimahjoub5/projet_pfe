import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { TicketService } from '../../services/tickets.service';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone:true,
  imports:[FullCalendarModule]
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    eventMouseEnter: this.handleEventMouseEnter.bind(this) // Liez la méthode handleEventMouseEnter à l'événement eventMouseEnter
  };
  events: any[] = []; // Déclarez un tableau pour stocker les événements

  constructor(private ticketService: TicketService,private auth:AuthService) { } // Injectez le service TicketService

  ngOnInit(): void {
    // Remplacez `1` par l'ID réel de l'assigné
    this.ticketService.getTicketsByAssignee(Number(this.auth.getUserID())).subscribe(
      tickets => {
        this.setupCalendarEvents(tickets);
      },
      error => {
        console.error('Erreur lors de la récupération des tickets', error);
      }
    );
  }

  setupCalendarEvents(tickets: any[]): void {
    this.events = tickets.map(ticket => ({
      title: ticket.Subject,
      start: ticket.StartDate,
      end: ticket.ClosedDate || ticket.StartDate,
      description: ticket.Description, // Ajoutez la description à l'événement
      extendedProps: { ticketId: ticket.TicketID } // Vous pouvez ajouter des propriétés personnalisées ici
    }));

    // Mettez à jour les options du calendrier pour inclure les événements
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
  }

  handleEventMouseEnter(info: any): void {
    const eventEl = info.el;
    const eventTitle = info.event.title;
    const eventDescription = info.event.extendedProps?.Description || '';
  
    // Afficher le sujet et la description de l'événement au survol de la souris
    eventEl.setAttribute('title', `${eventTitle}\n\n${eventDescription}`);
  }
  
}
