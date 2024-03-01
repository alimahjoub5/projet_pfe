export interface EquipmentType {
    EquipmentTypeID?: number;
    TypeName: string;
    Description?: string;
    Manufacturer?: string;
    ModelNumber?: string;
    SerialNumber?: string;
    InstallationDate?: Date | string; // Peut être une date ou une chaîne de caractères
    WarrantyExpiration?: Date | string; // Peut être une date ou une chaîne de caractères
    MaintenanceInterval?: number;
    LastMaintenanceDate?: Date | string; // Peut être une date ou une chaîne de caractères
    CreatedBy: number;
    CreatedOn?: Date | string; // Peut être une date ou une chaîne de caractères
    ModifiedBy?: number;
    ModifiedOn?: Date | string; // Peut être une date ou une chaîne de caractères
}
