export interface Stock {
    nom_piece: string;
    description:string;
    quantite: number;
    quantite_reservee: number;
    seuil_min: number;
    seuil_max: number;
    fournisseur_id: number;
    image_piece: string; // Modifier le type en string pour représenter le chemin de l'image
  }
  