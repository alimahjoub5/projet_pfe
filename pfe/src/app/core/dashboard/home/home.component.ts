import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { Task } from './interface/task';
import { Equipment } from './interface/Equipment';

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
  equipments: Equipment[];
  tasks: Task[];

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
     this.userName = "Ali Et Oumaima";
     this.lastTask = "Vérifier les systèmes de climatisation";
 
     // Initialisation des données fictives pour les notifications
     this.notifications = [
       { message: 'Une nouvelle demande de maintenance a été soumise.' },
       { message: 'La maintenance préventive du système de ventilation est prévue pour demain.' },
       { message: 'Une alerte de température élevée a été détectée dans le serveur principal.' },
     ];

  // Génération de données fictives pour les équipements
  this.equipments = [
    { name: 'Chaudière principale', location: 'Salle des machines', status: 'En fonctionnement' },
    { name: 'Générateur de secours', location: 'Bâtiment A, rez-de-chaussée', status: 'Hors service' },
    { name: 'Système de sécurité incendie', location: 'Étages 1 à 5', status: 'En maintenance' },
    // Ajoutez d'autres équipements simulés ici
  ];

  // Génération de données fictives pour les tâches de maintenance
  this.tasks = [
    { title: 'Vérifier les systèmes de climatisation', status: 'En cours' },
    { title: "Réparer la fuite d'eau dans le hall principal", status: 'En attente' },
    { title: "Effectuer l'entretien préventif des ascenseurs", status: 'Planifié' },
    // Ajoutez d'autres tâches simulées ici
  ];
}
  }


