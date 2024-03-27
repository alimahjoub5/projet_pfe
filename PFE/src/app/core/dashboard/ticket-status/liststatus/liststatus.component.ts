import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule , ROUTES} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-liststatus',
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
  templateUrl: './liststatus.component.html',
  styleUrl: './liststatus.component.scss',
  providers: [MessageService] 
})
export class ListstatusComponent implements OnInit{
  ticketStatuses: TicketStatus[];
  isLoading: boolean;
cols: any;

  constructor(
    private ticketStatusService: TicketStatusService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService 
  ) {}

  ngOnInit(): void {
    this.loadTicketStatuses();
  }

  loadTicketStatuses(): void {
    this.isLoading = true;
    this.spinner.show(); // Afficher le spinner avant de récupérer les données

    this.ticketStatusService.getAllTicketStatuses().subscribe(
      ticketStatuses => {
        this.ticketStatuses = ticketStatuses;
        this.isLoading = false;
        this.spinner.hide(); // Masquer le spinner après le chargement des données
      },
      error => {
        console.error('Erreur lors du chargement des statuts de ticket :', error);
        this.isLoading = false;
        this.spinner.hide(); // Assurez-vous de cacher le spinner en cas d'erreur
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors du chargement des statuts de ticket.' }); // Afficher un message d'erreur

      }
    );
  }

  deleteTicketStatus(ticketStatusId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce statut de ticket ?')) {
      this.ticketStatusService.deleteTicketStatus(ticketStatusId).subscribe(() => {
        this.loadTicketStatuses(); // Recharger la liste des statuts de ticket après la suppression
      });
    }
  }
}