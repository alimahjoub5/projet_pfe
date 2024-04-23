export interface UtilisationPiece {
    utilisation_id: number;
    EquipmentTypeID: number;
    piece_id: number;
    quantity_used: number;
    date_utilisation: Date;
    description?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
  }
  