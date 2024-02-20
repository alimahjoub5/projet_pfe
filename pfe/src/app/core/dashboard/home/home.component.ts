import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { NgStyle } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, ChartModule, CalendarModule,NgStyle,MenuModule,TableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Correction de la propriété styleUrls
})
export class HomeComponent {
  recentTasks: any[] = [];
unreadTasks=20;
respondedTasks=30;
chartData: any;
chartOptions: any;
taskOverviewData: any[] = [];

  constructor() {
    this.recentTasks = [
      { id: 1, task: 'Inspecter les machines', employee: 'Jean Dupont', date: '2024-02-18' },
      { id: 2, task: 'Réparer la machine à coudre', employee: 'Marie Leblanc', date: '2024-02-17' },
      { id: 3, task: 'Installer le nouveau logiciel de maintenance', employee: 'Pierre Lefebvre', date: '2024-02-16' },
      { id: 4, task: 'Remplacer les pièces défectueuses', employee: 'Sophie Tremblay', date: '2024-02-15' },
      { id: 5, task: 'Faire l\'entretien préventif des machines', employee: 'Jacques Martin', date: '2024-02-14' }
    ];
     this.chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Tâches Terminées',
          data: [10, 15, 12, 18, 20, 25, 22],
          fill: false,
          borderColor: '#4caf50',
          tension: 0.4
        },
        {
          label: 'Tâches En Cours',
          data: [8, 10, 8, 12, 15, 18, 16],
          fill: false,
          borderColor: '#ff9800',
          tension: 0.4
        },
        {
          label: 'Tâches Non Commencées',
          data: [5, 6, 7, 8, 9, 10, 11],
          fill: false,
          borderColor: '#f44336',
          tension: 0.4
        }
      ]
    };
    
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            stepSize: 5
          }
        }
      }
    };
    
    
  }
  

}
