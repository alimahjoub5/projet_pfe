export interface Commande {
    nom_piece: string;
    date_commande: Date;
    date_livraison_prevue: Date;
    date_livraison_effective: Date;
    statut: string;
    fournisseur_id: number;
    total_commande: number;
  }
  