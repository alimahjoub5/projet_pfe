import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CommandeEnAttente } from '../../models/GestionDeStocks/CommandeEnAttente';
import { CommandeEnAttenteService } from '../../services/GestionDeStocks/CommandeEnAttente.service';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
       
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    RouterModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent implements OnInit {
  Commandes: CommandeEnAttente[] =[]; // Modifier le type de données ici
  showDialog: boolean = false;
  filteredCommandes: CommandeEnAttente[];

  constructor(
    private route: ActivatedRoute, 
    private commandeservice: CommandeEnAttenteService) { }

  ngOnInit(): void {
    this.getutilisation();
  }

  async getutilisation(): Promise<void> {
    this.commandeservice.getCommandesEnAttente().subscribe(response => {
      if (response && Array.isArray(response)) {
        this.Commandes = response; 
      } else {
        console.error('La réponse de l\'API est invalide :', response);
      }
    }, error => {
      console.error('Une erreur est survenue lors de la récupération des pièces :', error);
    });
  }

  showDialogToAdd() {
    this.showDialog = true;
  }

  filter(value: string) {
    if (!value) {
      this.filteredCommandes = this.Commandes;
    } else {
      this.filteredCommandes = this.Commandes.filter(
        commande => {
        return
        commande.piece_id.toString().toLowerCase().includes(value.toLowerCase()) || 
        commande.requested_quantity.toString().toLowerCase().includes(value.toLowerCase()) ||
        commande.order_date.toString().toLowerCase().includes(value.toLowerCase()) ||
        commande.order_status.toLowerCase().includes(value.toLowerCase()) ||
        commande.fournisseur_id.toString().toLowerCase().includes(value.toLowerCase()) ||
        commande.expected_delivery_date.toString().toLowerCase().includes(value.toLowerCase()) ||
        commande.actual_delivery_date.toString().toLowerCase().includes(value.toLowerCase()) 
      });
    }
  }

  confirmDeletecommande(Commandes: CommandeEnAttente): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.commandeservice.deleteCommandeEnAttente(Commandes.commande_id)
        .subscribe(() => {
          this.getutilisation();
        });
    }
  }
}
