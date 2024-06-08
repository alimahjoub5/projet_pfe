import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-taches-courbe',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './taches-courbe.component.html',
  styleUrl: './taches-courbe.component.scss'
})
export class TachesCourbeComponent {
  chartOptions: { responsive: boolean; maintainAspectRatio: boolean; scales: { y: { beginAtZero: boolean; title: { display: boolean; text: string; }; }; x: { title: { display: boolean; text: string; }; }; }; plugins: { legend: { display: boolean; position: string; }; tooltip: { callbacks: { label: (context: any) => any; }; }; datalabels: { anchor: string; align: string; color: string; formatter: (value: number) => string; }; }; };
  chartData: { labels: any; datasets: { label: string; backgroundColor: string; borderColor: string; borderWidth: number; data: any; fill: boolean; }[]; };

  constructor(private userservice:UserService,
    private auth:AuthService) {
  this.userservice.getUsersTasks().subscribe(data => {
    const userNames = data.map((item: any) => item.user.FirstName + ' ' + item.user.LastName);
    const completedTasks = data.map((item: any) => item.completed_tasks);
    const pendingTasks = data.map((item: any) => item.pending_tasks);

    this.chartData = {
      labels: userNames,
      datasets: [
        {
          label: 'Tâches clôturées',
          backgroundColor: 'rgba(66, 165, 245, 0.8)',
          borderColor: '#42A5F5',
          borderWidth: 1,
          data: completedTasks,
          fill: false
        },
        {
          label: 'Tâches en cours/nouvelles',
          backgroundColor: 'rgba(255, 167, 38, 0.8)',
          borderColor: '#FFA726',
          borderWidth: 1,
          data: pendingTasks,
          fill: false
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nombre de tâches'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Utilisateurs'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
          color: 'black',
          formatter: (value: number) => {
            return value.toString();
          }
        }
      }
    };
  });
    }
}
