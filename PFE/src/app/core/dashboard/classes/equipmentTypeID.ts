export class EquipmentType {
    EquipmentTypeID: number;
    TypeName: string;
    Description: string;
    Manufacturer: string;
    ModelNumber: string;
    SerialNumber: string;
    InstallationDate: Date;
    WarrantyExpiration: Date;
    MaintenanceInterval: number;
    LastMaintenanceDate: Date;
    CreatedBy: number;
    CreatedOn: Date;
    ModifiedBy: number;
    ModifiedOn: Date;
  
    constructor(
      EquipmentTypeID: number,
      TypeName: string,
      Description: string,
      Manufacturer: string,
      ModelNumber: string,
      SerialNumber: string,
      InstallationDate: Date,
      WarrantyExpiration: Date,
      MaintenanceInterval: number,
      LastMaintenanceDate: Date,
      CreatedBy: number,
      CreatedOn: Date,
      ModifiedBy: number,
      ModifiedOn: Date
    ) {
      this.EquipmentTypeID = EquipmentTypeID;
      this.TypeName = TypeName;
      this.Description = Description;
      this.Manufacturer = Manufacturer;
      this.ModelNumber = ModelNumber;
      this.SerialNumber = SerialNumber;
      this.InstallationDate = InstallationDate;
      this.WarrantyExpiration = WarrantyExpiration;
      this.MaintenanceInterval = MaintenanceInterval;
      this.LastMaintenanceDate = LastMaintenanceDate;
      this.CreatedBy = CreatedBy;
      this.CreatedOn = CreatedOn;
      this.ModifiedBy = ModifiedBy;
      this.ModifiedOn = ModifiedOn;
    }
  }
  