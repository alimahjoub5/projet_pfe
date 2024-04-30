export interface CommandeEnAttente {
  commande_id: number;
  piece_id: number;
  requested_quantity: number;
  order_date: Date;
  order_status: string;
  fournisseur_id: number;
  expected_delivery_date?: Date | null;
  actual_delivery_date?: Date | String |null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

  