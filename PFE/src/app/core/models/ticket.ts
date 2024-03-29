export interface Ticket {
    TicketID: number;
    CreatedBy: number;
    CreatedOn?: Date;
    ModifiedBy: number;
    ModifiedOn?: Date;
    StatusCodeID: number;
    AssigneeID?: number | null;
    Subject: string;
    Description?: string | null;
    PriorityID: number;
    GroupID?: number | null;
    EquipmentTypeID?: number | null;
    StartDate?: Date | null;
    EndDate?: Date | null;
    DueDate: Date;
    ClosedDate?: Date | null;
    EquipmentTypeName? : string |null;
    PriorityName? : string | null;

}