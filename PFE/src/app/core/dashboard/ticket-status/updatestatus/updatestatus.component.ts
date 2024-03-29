import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
@Component({
  selector: 'app-updatestatus',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './updatestatus.component.html',
  styleUrl: './updatestatus.component.scss'
})
export class UpdatestatusComponent {
  ticketStatus: TicketStatus;
  StatusCodeID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketStatusService: TicketStatusService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.StatusCodeID = params.get('StatusCodeID');
      this.ticketStatusService.getTicketStatusById(Number(this.StatusCodeID)).subscribe(ticketStatus => {
        this.ticketStatus = ticketStatus;
      });
    });
  }

  updateTicketStatus(): void {
    this.ticketStatusService.updateTicketStatus(Number(this.StatusCodeID),this.ticketStatus).subscribe(updateTicketStatus => {
      console.log('Ticket status updated successfully:', updateTicketStatus);
      // Rediriger vers la page de détails de l'utilisateur mis à jour
      this.router.navigate(['statusdetail/', this.StatusCodeID]);
    });
  }
}


