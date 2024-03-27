import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriorityService } from 'src/app/core/services/priority.service';
import { Priority } from 'src/app/core/models/Priority';
@Component({
  selector: 'app-priorityupdate',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './priorityupdate.component.html',
  styleUrl: './priorityupdate.component.scss'
})
export class PriorityupdateComponent implements OnInit {

  priority: Priority;
  PriorityID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private priorityservice: PriorityService 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.PriorityID = params.get('PriorityID');
      this.priorityservice.getPriorityById(Number(this.PriorityID)).subscribe(priority => {
        this.priority = priority;
      });
    });
  }

  updatePriority(): void {
    this.priorityservice.updatePriority(Number(this.PriorityID),this.priority).subscribe(updatePriority => {
      console.log('Priority updated successfully:', updatePriority);
      // Rediriger vers la page de détails de l'utilisateur mis à jour
      this.router.navigate(['priority-details/', this.PriorityID]);
    });
  }


}
