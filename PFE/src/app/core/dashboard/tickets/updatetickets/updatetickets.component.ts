import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-updatetickets',
   templateUrl: './updatetickets.component.html',
  styleUrl: './updatetickets.component.scss',
  standalone: true,
  imports: [FormsModule,
    ButtonModule,
     ReactiveFormsModule, 
    AutoCompleteModule,
    TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule,
    NgxSpinnerModule,
CommonModule],
providers: [MessageService]
 
})
export class UpdateticketsComponent implements OnInit {

  ticket: Ticket;
  ticketID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private messageService: MessageService  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketID = params.get('TicketID');
      this.ticketService.getTicketById(Number(this.ticketID)).subscribe(ticket => {
        this.ticket = ticket;
      });
    });
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'intervention modifié avec succès' });
  }
  updateTicket(): void {
    this.ticketService.updateTicket(Number(this.ticketID), this.ticket).subscribe(updatedTicket => {
      console.log('Ticket updated successfully:', updatedTicket);
      this.showSuccess();
    });
  }
}
