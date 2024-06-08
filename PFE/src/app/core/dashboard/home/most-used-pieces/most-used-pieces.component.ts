import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UtilisationPieceService } from 'src/app/core/services/GestionDeStocks/utilisation-piece.service';

@Component({
  selector: 'app-most-used-pieces',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './most-used-pieces.component.html',
  styleUrl: './most-used-pieces.component.scss'
})
export class MostUsedPiecesComponent implements OnInit {
  data: any;
  options: any;

  constructor(private statisticsService: UtilisationPieceService) { }

  ngOnInit() {
    this.statisticsService.getMostUsedPieces().subscribe(response => {
      const labels = response.map(item => item.piece.nom_piece);
      const data = response.map(item => item.total_quantity_used);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Pièces les plus utilisées',
            data: data,
            backgroundColor: '#42A5F5'
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
