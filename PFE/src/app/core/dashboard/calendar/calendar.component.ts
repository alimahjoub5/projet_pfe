import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { TicketService } from '../../services/tickets.service';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { forkJoin } from 'rxjs';

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

  constructor(private ticketService: TicketService, 
    private auth: AuthService,
    private task : TaskService
    ) { } // Injectez le service TicketService

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const userID = Number(this.auth.getUserID());
    
    forkJoin([
      this.ticketService.getTicketsByAssignee(userID),
      this.task.getTaskByAssignee(userID)
    ]).subscribe(
      ([tickets, tasks]) => {
        const allEvents = [...this.mapTicketsToEvents(tickets), ...this.mapTasksToEvents(tasks)];
        this.setupCalendarEvents(allEvents);
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  mapTicketsToEvents(tickets: any[]): any[] {
    return tickets.map(ticket => ({
      title: ticket.Subject,
      start: ticket.StartDate,
      end: ticket.ClosedDate || ticket.StartDate,
      description: ticket.Description,
      extendedProps: { type: 'ticket', id: ticket.TicketID }
    }));
  }

  mapTasksToEvents(tasks: any[]): any[] {
    return tasks.map(task => ({
      title: task.Subject,
      start: task.StartDate,
      end: task.EndDate || task.StartDate,
      description: task.Description,
      extendedProps: { type: 'task', id: task.TicketTaskID }
    }));
  }

  setupCalendarEvents(events: any[]): void {
    this.events = events;
    // Mettez à jour les options du calendrier pour inclure les événements
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
  }

  handleEventMouseEnter(info: any): void {
    const eventEl = info.el;
    const eventTitle = info.event.title;
    const eventType = info.event.extendedProps.type === 'ticket' ? 'Ticket' : 'Tâche';
    const eventDescription = info.event.extendedProps.description || '';
    const eventID = info.event.extendedProps.id;

    // Afficher le sujet, le type, la description et l'ID de l'événement au survol de la souris
    eventEl.setAttribute('title', `${eventType}: ${eventTitle}\n\nDescription: ${eventDescription}\n\nID: ${eventID}`);
  }
}

