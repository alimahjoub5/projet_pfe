import { Component } from '@angular/core';

@Component({
  selector: 'app-addcommande',
  standalone: true,
  imports: [],
  templateUrl: './addcommande.component.html',
  styleUrl: './addcommande.component.scss'
})
export class AddcommandeComponent {

<<<<<<< Updated upstream
}
=======

    commande: CommandeEnAttente ;
    pieces: Piece[]; // Supposons que vous avez une liste de pièces
    fournisseurs: Fournisseur; // Supposons que vous avez une liste de fournisseurs
  filteredPieces: Piece;
  
    constructor(private pieceService : PieceService) {
      // Initialisez éventuellement les listes de pièces et de fournisseurs
    }

    
    
  ngOnInit(): void {
    this.loadPieces();
  }

    submitForm() {
      // Gérez ici la soumission du formulaire
      console.log('Formulaire soumis :', this.commande);
      // Vous pouvez envoyer la commande au serveur ici ou effectuer d'autres actions nécessaires
    }

  

    loadPieces(): void {
      this.pieceService.getAllPieces().subscribe(
        (response: any) => {
          // Vérifie si la propriété 'pieces' existe et si elle est de type 'Piece[]'
          if (response && Array.isArray(response.pieces)) {
            this.pieces = response.pieces;
            console.log(this.pieces);
          } else {
            console.error('La réponse de l\'API est invalide :', response);
          }
        },
        error => {
          console.error('Une erreur est survenue lors de la récupération des pièces :', error);
        }
      );
    }

  }
>>>>>>> Stashed changes
