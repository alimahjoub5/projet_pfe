import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-tache-rec-Emp',
  standalone: true,
  imports: [CardModule,TableModule],
  templateUrl: './tache-rec.component.html',
  styleUrl: './tache-rec.component.scss'
})
export class TacheRecEmpComponent {
  recentTasks: any;
constructor(private taskService:TaskService,
  private auth : AuthService
  ){}
ngOnInit(): void {
  this.getTasksByUser();
}

getTasksByUser(): void {
  this.taskService.getAllTasks()
    .subscribe(tasks => {
      this.recentTasks = tasks;
      console.log(tasks)
    });
}

}