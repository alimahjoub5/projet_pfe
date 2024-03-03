import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomerService } from 'src/app/demo/service/customer.service';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/tickets.service';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { PriorityService } from 'src/app/core/services/priority.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule,
    CommonModule
],
  templateUrl: './list.component.html',
  providers: [MessageService, ConfirmationService

],
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTicket: Ticket | undefined;

  constructor(private ticketService: TicketService,
              private equipmentService: EquipmentTypeService,
              private priorityService: PriorityService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.loadEquipmentNames();
        this.loadPriorityNames(); // Charger les noms de priorité après avoir récupéré les tickets
      },
      (error) => {
        console.log('Error occurred while loading tickets:', error);
      }
    );
  }

  loadEquipmentNames() {
    for (let ticket of this.tickets) {
      if (ticket.EquipmentTypeID !== undefined) {
        this.equipmentService.getEquipmentName(ticket.EquipmentTypeID).subscribe(
          (equipmentName: string) => {
            ticket.EquipmentTypeName = equipmentName;
          },
          (error) => {
            console.log('Error occurred while loading equipment name:', error);
          }
        );
      }
    }
  }

  loadPriorityNames() {
    for (let ticket of this.tickets) {
      if (ticket.PriorityID !== undefined) {
        this.priorityService.getPriorityName(ticket.PriorityID).subscribe(
          (priorityName: string) => {
            ticket.PriorityName = priorityName; // Ajouter le nom de la priorité à chaque ticket
          },
          (error) => {
            console.log('Error occurred while loading priority name:', error);
          }
        );
      }
    }
  }
  

  getSeverity(statusCodeID: number): string {
    // Logic to determine severity based on status code ID
    return ''; // Return appropriate severity string
  }


}