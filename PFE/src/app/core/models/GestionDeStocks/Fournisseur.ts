export interface Fournisseur {
  fournisseur_id: number; // Identifiant du fournisseur
  nom_fournisseur: string; // Nom du fournisseur
  adresse: string; // Adresse du fournisseur
  email: string; // Email du fournisseur
  telephone: string; // Numéro de téléphone du fournisseur
  created_by?: number | null; // ID de l'utilisateur ayant créé le fournisseur (optionnel)
  modify_by?: number | null; // ID de l'utilisateur ayant modifié le fournisseur (optionnel)
  created_at?: Date | null; // Date de création du fournisseur (optionnel)
  updated_at?: Date | null; // Date de mise à jour du fournisseur (optionnel)
}
