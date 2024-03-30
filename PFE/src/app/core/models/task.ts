export interface Task {
   
    TicketTaskID?: number;
    TicketID?: number;
    CreatedBy?: string;
    CreatedOn: Date | string;
    ModifiedBy?: string;
    ModifiedOn: Date | string;
    StatusCodeID?: number;
    AssigneeID: number;
    Subject?: string;
    Description: string;
    PriorityID?: number;
    DueDate?: Date | string;
    StartDate: Date | string;
    EndDate: Date | string;
    CompletedDate: Date | string;
    PriorityName: string;
    StatusName: string;
    AssigneeName : string;
    ticketname: string;
  }
  