import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-createticketstatut',
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule  ],
  templateUrl: './createticketstatut.component.html',
  styleUrl: './createticketstatut.component.scss'
})
export class CreateticketstatutComponent implements OnInit{
  ticketStatusForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ticketStatusService: TicketStatusService,
    private authservice :AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.ticketStatusForm = this.formBuilder.group({
      StatusName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ticketStatusForm.valid) {
      const statusName = this.ticketStatusForm.value.StatusName;
      this.ticketStatusService.addTicketStatus({
        StatusName: statusName,
        CreatedBy: Number(this.authservice.getUserID()),
        ModifiedBy: null,
        
      }).subscribe(
        () => {
          // Success message or navigation to another page
          console.log('Ticket status added successfully.');
          this.ticketStatusForm.reset();

        },
        error => {
          console.error('Error adding ticket status:', error);
          // Handle error (e.g., display error message)
        }
      );
    } else {
      // Form is invalid, handle invalid f
    }
  }
}