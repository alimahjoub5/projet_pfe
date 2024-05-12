// societe.model.ts

export interface Societe {
    filter(arg0: (societe: any) => any): Societe[];
    SocieteID?: number;
    name: string;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    contact_person?: string | null;
    contact_phone?: string | null;
    contact_email?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  