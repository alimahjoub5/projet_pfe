import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';

@Component({
  selector: 'app-equipment-avalibility',
  standalone: true,
  imports: [ChartModule,CommonModule],
  templateUrl: './equipment-avalibility.component.html',
  styleUrl: './equipment-avalibility.component.scss'
})
export class EquipmentAvailabilityComponent implements OnInit {
  chartData: ChartData;
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  };

  constructor(private equipmentService: EquipmentTypeService) { }

  ngOnInit(): void {
    const equipmentTypeId = 1; // Replace with your desired equipment type ID
    const startDate = '2023-01-01'; // Replace with your desired start date
    const endDate = '2024-06-07'; // Replace with your desired end date (can be today's date)

    this.equipmentService.getAvailabilityRate(equipmentTypeId, startDate, endDate)
      .subscribe(data => {
        console.log(data);
        this.processChartData(data);
      });
  }

  processChartData(data: any) {
    this.chartData = {
      labels: data.dates.map((date: string) => new Date(date)),
      datasets: [
        {
          label: 'Taux de Disponibilité',
          data: data.availability_rate,
          borderColor: '#4bc0c0',
          fill: false
        }
      ]
    };
  }
}
