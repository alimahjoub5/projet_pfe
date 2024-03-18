import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { PriorityService } from 'src/app/core/services/priority.service';
import { Priority } from 'src/app/core/models/Priority';
@Component({
  selector: 'app-priority-details',
  standalone : true,
  imports : [ProgressSpinnerModule,CommonModule],
  templateUrl: './priority-details.component.html',
  styleUrl: './priority-details.component.scss'
})
export class PriorityDetailsComponent implements OnInit{

  priorityID: number;
  priority: Priority;
  isLoading = false;

  constructor(private route: ActivatedRoute, private priorityService: PriorityService) { }

  ngOnInit(): void {
    this.priorityID = +this.route.snapshot.paramMap.get('id');
    this.getPriorityDetails(this.priorityID);
  }

  getPriorityDetails(priorityID: number): void {
    this.isLoading = true;
    this.priorityService.getPriorityById(priorityID).subscribe(priority => {
      this.priority = priority;
      this.isLoading = false;
    });
  }

  printDocument(): void {
    window.print();
  }


}