import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, ChartModule, CalendarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Correction de la propriété styleUrls
})
export class HomeComponent {
  maintenanceRequestsData: any;
  maintenanceRequestsOptions: any;
  userName: string;
  lastTask: string; // Supposons que vous stockez le titre de la dernière tâche ici
  notifications: any[]; // Ajoutez cette propriété pour stocker les notifications


  constructor() {
    // Exemple de fausses options pour maintenanceRequestsOptions
    this.maintenanceRequestsOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    // Exemple de fausses données pour maintenanceRequestsData
    this.maintenanceRequestsData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      datasets: [
        {
          label: 'Demandes de maintenance',
          data: [120, 150, 180, 200, 190, 210, 220, 230, 250, 270, 280, 300],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

     // Initialisation des données fictives pour le nom d'utilisateur et la dernière tâche
     this.userName = "John Doe";
     this.lastTask = "Vérifier les systèmes de climatisation";
 
     // Initialisation des données fictives pour les notifications
     this.notifications = [
       { message: 'Une nouvelle demande de maintenance a été soumise.' },
       { message: 'La maintenance préventive du système de ventilation est prévue pour demain.' },
       { message: 'Une alerte de température élevée a été détectée dans le serveur principal.' },
       // Ajoutez d'autres notifications simulées ici
     ];
   
  }
}

