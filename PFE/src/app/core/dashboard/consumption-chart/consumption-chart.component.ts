import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-consumption-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './consumption-chart.component.html',
  styleUrl: './consumption-chart.component.scss'
})
export class ConsumptionChartComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/usage-statistics').subscribe(data => {
      this.data = {
        labels: data.map(entry => entry.label),
        datasets: [
          {
            label: 'Consumption',
            data: data.map(entry => entry.consumption),
            fill: false,
            borderColor: '#4bc0c0'
          }
        ]
      };
    });
  }
}
