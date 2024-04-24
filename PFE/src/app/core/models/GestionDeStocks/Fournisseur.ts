export interface Fournisseur {
    fournisseur_id: number;
    nom_fournisseur: string;
    adresse: string;
    email: string;
    telephone: string;
    created_by?: number | null;
    modify_by?: number | null;
    created_at?: Date | null;
    updated_at?: Date | null;
  }
  