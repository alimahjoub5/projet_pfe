import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UtilisationPieceService } from 'src/app/core/services/GestionDeStocks/utilisation-piece.service';

@Component({
  selector: 'app-most-consumed-equipment',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './most-consumed-equipment.component.html',
  styleUrl: './most-consumed-equipment.component.scss'
})
export class MostConsumedEquipmentComponent implements OnInit {
  data: any;
  options: any;

  constructor(private statisticsService: UtilisationPieceService) { }

  ngOnInit() {
    this.statisticsService.getMostConsumedEquipment().subscribe(response => {
      const labels = response.map(item => item.equipment.TypeName);
      const data = response.map(item => item.total_quantity_used);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Équipement le plus consommé',
            data: data,
            backgroundColor: '#FF6384'
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