import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { TaskService } from 'src/app/core/services/task.service';
import { TicketService } from 'src/app/core/services/tickets.service';

@Component({
  selector: 'app-createtasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DatePipe ,
    ButtonModule,
    CheckboxModule,
    CalendarModule
  ],
  providers:[DatePipe],
  templateUrl: './createtasks.component.html',
  styleUrls: ['./createtasks.component.scss']
})
export class CreatetasksComponent implements OnInit {
  ticketTaskForm: FormGroup;
  ticketId: any;
  username: any;

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute, 
              private auth: AuthService, 
              private datePipe: DatePipe,
              private task: TaskService,
              private ticketService: TicketService) {
    this.ticketTaskForm = this.fb.group({
      Subject: ['', Validators.required], // Corrected control name
      Description: ['', Validators.required], // Corrected control name
      StartDate: [null],
      EndDate: [null],
      StatusCodeID: [''],
      changeStatus: [false] // Initializing the checkbox control
    });

    this.ticketTaskForm.get('changeStatus').valueChanges.subscribe(value => {
      if (value) {
        this.ticketTaskForm.get('StatusCodeID').setValue('résolu'); // Corrected status code value
      } else {
        this.ticketTaskForm.get('StatusCodeID').reset();
      }
    });

    this.ticketTaskForm.get('changeStatus').valueChanges.subscribe(value => {
      const startDateControl = this.ticketTaskForm.get('StartDate');
      const endDateControl = this.ticketTaskForm.get('EndDate');

      if (value) {
        startDateControl.clearValidators();
        endDateControl.clearValidators();
      } else {
        startDateControl.setValidators([Validators.required]);
        endDateControl.setValidators([Validators.required]);
      }

      startDateControl.updateValueAndValidity();
      endDateControl.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.username = this.auth.getUsername();
  }

  onSubmit(): void {
    if (this.ticketTaskForm.valid) {
      const taskData = this.ticketTaskForm.value;
      taskData.TicketID = this.ticketId;
      taskData.AssigneeID = this.auth.getUserID();
      taskData.CreatedBy = this.auth.getUserID();

      // Format dates only if they are not null
      if (taskData.StartDate) {
        taskData.StartDate = this.datePipe.transform(taskData.StartDate, 'yyyy-MM-dd HH:mm:ss');
      }

      if (taskData.EndDate) {
        taskData.EndDate = this.datePipe.transform(taskData.EndDate, 'yyyy-MM-dd HH:mm:ss');
      }

      console.log(taskData);

      this.task.addTask(taskData).subscribe(
        response => {
          console.log('Task added successfully:', response);
          this.ticketTaskForm.reset();
        },
        error => {
          console.error('Error adding task:', error);
        }
      );
    }
  }

  onCancel(): void {
    // Handle form cancellation
  }
}

