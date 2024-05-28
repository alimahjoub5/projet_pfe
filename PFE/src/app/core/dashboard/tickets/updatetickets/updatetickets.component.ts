import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updatetickets',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './updatetickets.component.html',
  styleUrl: './updatetickets.component.scss'
})
export class UpdateticketsComponent implements OnInit {
isDisable: any;
showAssignDialog() {
throw new Error('Method not implemented.');
}

  ticket: Ticket;
  ticketID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketID = params.get('TicketID');
      this.ticketService.getTicketById(Number(this.ticketID)).subscribe(ticket => {
        this.ticket = ticket;
      });
    });
  }

  updateTicket(): void {
    this.ticketService.updateTicket(Number(this.ticketID), this.ticket).subscribe(updatedTicket => {
      console.log('Ticket updated successfully:', updatedTicket);
      // Rediriger vers la page de détails du ticket mis à jour
      this.router.navigate(['ticket-details/', this.ticketID]);
    });
  }
}
