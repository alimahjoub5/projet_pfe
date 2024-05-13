export interface Ticket {
    TicketID: number;
    CreatedBy: number;
    CreatedOn?: Date | null;
    ModifiedBy: number;
    ModifiedOn?: Date | null;
    StatusCodeID: 'nouveau' | 'planifie' | 'en_cours' | 'resolu' | 'cloture'; // Assuming enum-like behavior
    AssigneeID: number | null;
    Subject: string;
    Description?: string | null;
    PriorityID: 'basse' | 'normale' | 'haute'; // Assuming enum-like behavior
    SocieteID: number | null;
    GroupID: number | null;
    EquipmentTypeID?: number | null;
    StartDate?: Date | null;
    ClosedDate?: Date | null;
    StatusValidation: boolean; // Assuming enum-like behavior
    TicketType: string; // Assuming enum-like behavior
    DueDate: Date;
    EquipmentTypeName?: string | null;
    PriorityName?: string | null;
    GroupName?: string | null;
    username?: string; // for user display name
}
