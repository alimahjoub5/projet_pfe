export interface TicketStatus {
    StatusCodeID?: number;
    StatusName: string;
    CreatedBy: number;
    CreatedOn?: Date;
    ModifiedBy: number;
    ModifiedOn?: Date; 
}