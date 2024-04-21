export interface StockPiece {
    stock_id?: number; // Le '?' indique que la propriété est optionnelle
    piece_id?: number;
    equipment_id?: number;
    quantity?: number;
    reserved_quantity?: number;
    local?: string;
    created_by?: number;
    modify_by?: number;
  }
  
  