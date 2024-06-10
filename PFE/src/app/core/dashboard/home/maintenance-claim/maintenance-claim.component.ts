import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';

@Component({
  selector: 'app-maintenance-claim',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './maintenance-claim.component.html',
  styleUrl: './maintenance-claim.component.scss'
})
export class MaintenanceClaimComponent  implements OnInit {
  chartData: any;
  chartOptions: any;

  constructor(private maintenanceService: EquipmentTypeService) { }

  ngOnInit() {
    this.maintenanceService.getMaintenanceClaimRate().subscribe(data => {
      this.chartData = {
        labels: ['Total Équipements', 'Total Réclamations de Maintenance', 'Taux de Réclamation de Maintenance (%)'],
        datasets: [
          {
            label: 'Statistiques de Maintenance',
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            data: [data.total_equipments, data.total_maintenance_claims, data.maintenance_claim_rate]
          }
        ]
      };

      this.chartOptions = {
        title: {
          display: true,
          text: 'Taux de Réclamation de Maintenance',
          fontSize: 16
        },
        legend: {
          position: 'top'
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart',
          from: 0
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };
    });
  }

  
  
}