import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-bestseller',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bestseller.component.html',
  styleUrl: './bestseller.component.scss'
})
export class BestsellerComponent implements OnInit {
  data: any;
  options: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:8000/api/best-suppliers-stats').subscribe(res => {
      const fournisseurs = res.map(item => item.nom_fournisseur);
      const moyenneDelai = res.map(item => item.moyenne_delai);

      this.data = {
        labels: fournisseurs,
        datasets: [
          {
            label: 'Moyenne de délai de livraison',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: moyenneDelai
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