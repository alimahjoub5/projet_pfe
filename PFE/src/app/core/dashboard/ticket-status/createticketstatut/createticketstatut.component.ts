import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
@Component({
  selector: 'app-createticketstatut',
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule  ],
  templateUrl: './createticketstatut.component.html',
  styleUrl: './createticketstatut.component.scss'
})
export class CreateticketstatutComponent implements OnInit{
  ticketStatusForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketStatusService: TicketStatusService) {}

  ngOnInit(): void {
    this.ticketStatusForm = this.fb.group({
      StatusName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ticketStatusForm.invalid) {
      return;
    }
   
    const ticketStatusData = this.ticketStatusForm.value;
    const ticketStatus: TicketStatus = {
      StatusName: ticketStatusData.StatusName,
      CreatedBy: 1, // Vous devez définir une valeur appropriée pour CreatedBy et ModifiedBy
      ModifiedBy: 1, // Vous devez définir une valeur appropriée pour CreatedBy et ModifiedBy
     
    };

    this.ticketStatusService.addTicketStatus(ticketStatus)
      .subscribe(
        response => {
          console.log('Ticket status added successfully:', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.ticketStatusForm.reset();
        },
        error => {
          console.error('Error adding ticket status:', error);
        }
      );
  }
}