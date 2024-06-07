import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule ,Route} from '@angular/router';
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
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CommandeEnAttente } from '../../models/GestionDeStocks/CommandeEnAttente';
import { CommandeEnAttenteService } from '../../services/GestionDeStocks/CommandeEnAttente.service';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/GestionDeStocks/stock.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem} from 'primeng/api';

import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';


@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    FormsModule,
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
CommonModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss',
  providers:[MessageService]
})
export class CommandeComponent implements OnInit {
  Commandes: CommandeEnAttente[] =[]; // Modifier le type de données ici
  showDialog: boolean = false;
  filteredCommandes: CommandeEnAttente[];
cols:any;
  constructor(
    private route: ActivatedRoute, 
    private commandeservice: CommandeEnAttenteService,
    private stockPieceService: StockService
    ) { }

  ngOnInit(): void {
    this.getutilisation();
  }
   
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  async getutilisation(): Promise<void> {
    this.commandeservice.getCommandesEnAttente().subscribe(response => {
      if (response && Array.isArray(response)) {
        this.Commandes = response; 
        console.log(this.Commandes);
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



  confirmDeletecommande(Commandes: CommandeEnAttente): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.commandeservice.deleteCommandeEnAttente(Commandes.commande_id)
        .subscribe(() => {
          this.getutilisation();
        });
    }
  }

  confirmerCommande(commande: CommandeEnAttente) {
    // Mettre à jour le statut de la commande dans la base de données ou effectuer toute autre action nécessaire
    commande.order_status = 'livree'; // Supposons que 'livree' est le nouveau statut pour une commande confirmée
    commande.actual_delivery_date = this.getFormattedDate(); // remplir actual_delivery_date avec la date et l'heure actuelles

    this.commandeservice.updateCommandeEnAttente(commande.commande_id, commande).subscribe(
      (response) => {
        console.log('Commande confirmée avec succès !');
        this.updateStockQuantity(commande.stock_piece.stock_id, commande.requested_quantity, '1'); // Mettre à jour le stock
        this.getutilisation();
        // Mettez à jour votre interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la confirmation de la commande : ', error);
        // Gérer l'erreur ici
      }
    );
  }

  updateStockQuantity(pieceId: number, quantity: number, modifyBy: string) {
    this.stockPieceService.updateStockQuantity(pieceId, quantity, modifyBy).subscribe(
      (response) => {
        console.log('Stock mis à jour avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du stock : ', error);
        // Gérer l'erreur ici
      }
    );
  }


  consulterFacture(pdfLink: string): void {
    window.open(pdfLink, '_blank');
}
  annulerCommande(commande: CommandeEnAttente) {
    // Mettre à jour le statut de la commande dans la base de données ou effectuer toute autre action nécessaire
    commande.order_status = 'Annuler'; // Supposons que 'livree' est le nouveau statut pour une commande confirmée
    this.commandeservice.updateCommandeEnAttente(commande.commande_id,commande).subscribe(
      (response) => {
        console.log('Commande Annuler avec succès !');
        this.getutilisation();

        // Mettez à jour votre interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la confirmation de la commande : ', error);
        // Gérer l'erreur ici
      }
    );
 
  }


  getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.padNumber(now.getMonth() + 1);
    const day = this.padNumber(now.getDate());
    const hour = this.padNumber(now.getHours());
    const minute = this.padNumber(now.getMinutes());
    const second = this.padNumber(now.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  padNumber(number: number): string {
    return (number < 10 ? '0' : '') + number;
  }
}
