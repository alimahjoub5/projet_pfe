import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   ReactiveFormsModule,  Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { Priority } from 'src/app/core/models/Priority';
import { PriorityService } from 'src/app/core/services/priority.service';

@Component({
  selector: 'app-createpriority',
  templateUrl: './createpriority.component.html',
  styleUrls: ['./createpriority.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule,DropdownModule,CheckboxModule  ]
})
export class CreatepriorityComponent implements OnInit {
  priorityForm: FormGroup;

  constructor(private fb: FormBuilder, private priorityService: PriorityService) {
    this.priorityForm = this.fb.group({
      Name: ['', Validators.required],
      CreatedBy: [1], // Default value for CreatedBy, adjust as needed
      ModifiedBy: [1] // Default value for ModifiedBy, adjust as needed
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.priorityForm.invalid) {
      return;
    }

    const priorityData = this.priorityForm.value;
    const priority: Priority = {
      Name: priorityData.Name,
      CreatedBy: priorityData.CreatedBy,
      ModifiedBy: priorityData.ModifiedBy,
      PriorityID: null,
      CreatedOn: null, // You may want to set this to a meaningful value
      ModifiedOn: null // You may want to set this to a meaningful value
    };

    this.priorityService.createPriority(priority)
      .subscribe(
        response => {
          console.log('Priority added successfully:', response);
          this.priorityForm.reset();
        },
        error => {
          console.error('Error adding priority:', error);
        }
      );
  }
}
