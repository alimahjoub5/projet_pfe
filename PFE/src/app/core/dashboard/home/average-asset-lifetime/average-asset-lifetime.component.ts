import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { EquipmentTypeService } from 'src/app/core/services/equipements.service';
import { TicketService } from 'src/app/core/services/tickets.service';

@Component({
  selector: 'app-average-asset-lifetime',
  standalone: true,
  imports: [CardModule],
  templateUrl: './average-asset-lifetime.component.html',
  styleUrl: './average-asset-lifetime.component.scss'
})
export class AverageAssetLifetimeComponent implements OnInit {
  averageAssetLifetime: number;
  unplannedDowntime: any;

  constructor(private equipmentService: EquipmentTypeService,
    private ticket: TicketService
    ) { }

    ngOnInit() {
      this.equipmentService.getAverageAssetLifetime().subscribe(data => {
        this.averageAssetLifetime = data.average_asset_lifetime;
      }, error => {
        console.error('Error fetching average asset lifetime', error);
      });
  
      this.ticket.getUnplannedDowntime().subscribe(data => {
        this.unplannedDowntime = this.convertMinutesToReadableFormat(data.unplanned_downtime);
      }, error => {
        console.error('Error fetching unplanned downtime', error);
      });
    }
  
    convertMinutesToReadableFormat(totalMinutes: number): string {
      const days = Math.floor(totalMinutes / 1440); // 1440 minutes in a day
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;
  
      let readableFormat = '';
      if (days > 0) {
        readableFormat += `${days} jour${days > 1 ? 's' : ''} `;
      }
      if (hours > 0) {
        readableFormat += `${hours} heure${hours > 1 ? 's' : ''} `;
      }
      if (minutes > 0 || totalMinutes === 0) {
        readableFormat += `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
  
      return readableFormat.trim();
    }
}