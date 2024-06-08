import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-commande-stat',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './commande-stat.component.html',
  styleUrl: './commande-stat.component.scss'
})
export class CommandeStatComponent implements OnInit {
  data: any;
  options: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:8000/api/commande-stat').subscribe(res => {
      const enCoursCount = res.en_cours.length;
      const livreesCount = res.livrees.length;
      const annuleesCount = res.annulees.length;

      this.data = {
        labels: ['En cours', 'Livrées', 'Annulées'],
        datasets: [
          {
            data: [enCoursCount, livreesCount, annuleesCount],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ]
          }
        ]
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false
      };
    });
  }
}
