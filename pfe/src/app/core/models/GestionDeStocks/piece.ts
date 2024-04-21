export interface Piece {
    piece_id: number;
    nom_piece: string;
    description?: string;
    image_piece: string;
    material?: string;
    serial_number?: string;
    fabrication_date?: Date;
    expiration_date?: Date;
    cost?: number;
    fournisseur_id?: number;
    filter?: string; // Définissez le type approprié pour la propriété filter

  }
  