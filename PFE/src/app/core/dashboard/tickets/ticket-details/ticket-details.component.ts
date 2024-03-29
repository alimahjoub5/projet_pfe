
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent {
  TicketID: number;
  ticket: Ticket;
  isLoading = false;

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.TicketID = +this.route.snapshot.paramMap.get('id');
    this.getTicketDetails(this.TicketID);
  }

  getTicketDetails(TicketID: number): void {
    this.isLoading = true; // Afficher le spinner avant de récupérer les données
    this.ticketService.getTicketById(TicketID).subscribe(ticket => {
      this.ticket = ticket;
      this.isLoading = false; // Cacher le spinner après la récupération des données
    });
  }

  printDocument(): void {
    window.print();
  }
}



