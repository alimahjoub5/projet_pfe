import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tache-rec',
  standalone: true,
  imports: [CardModule,TableModule],
  templateUrl: './tache-rec.component.html',
  styleUrl: './tache-rec.component.scss'
})
export class TacheRecComponent {
  recentTasks: any[] = [];
constructor(){
  this.recentTasks = [
    { id: 1, task: 'Inspecter les machines', employee: 'Jean Dupont', date: '2024-02-18' },
    { id: 2, task: 'Réparer la machine à coudre', employee: 'Marie Leblanc', date: '2024-02-17' },
    { id: 3, task: 'Installer le nouveau logiciel de maintenance', employee: 'Pierre Lefebvre', date: '2024-02-16' },
    { id: 4, task: 'Remplacer les pièces défectueuses', employee: 'Sophie Tremblay', date: '2024-02-15' },
    { id: 5, task: 'Faire l\'entretien préventif des machines', employee: 'Jacques Martin', date: '2024-02-14' }
  ];
}
}
