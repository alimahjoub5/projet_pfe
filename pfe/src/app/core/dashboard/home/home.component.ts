import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule, NgStyle } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { UserService } from '../../services/user-service.service';
import { AuthService } from '../../services/auth.service';
import { TachesCourbeComponent } from './taches-courbe/taches-courbe.component';
import { TacheRecComponent } from './tache-rec/tache-rec.component';
import { TacheRecEmpComponent } from './tache-rec copy/tache-rec.component';
import { CommandeStatComponent } from './commande-stat/commande-stat.component';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { MostUsedPiecesComponent } from "./most-used-pieces/most-used-pieces.component";
import { MostConsumedEquipmentComponent } from "./most-consumed-equipment/most-consumed-equipment.component";
import { AccessStatsComponent } from "./access-stats/access-stats.component";
import { MaintenanceClaimComponent } from "./maintenance-claim/maintenance-claim.component";
import { AverageAssetLifetimeComponent } from "./average-asset-lifetime/average-asset-lifetime.component";
import { FailuresByPeriodComponent } from "./failures-by-period/failures-by-period.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'] // Correction de la propriété styleUrls
    ,
    imports: [ButtonModule, ChartModule, CalendarModule, NgStyle, MenuModule, TableModule, CommonModule,
        TachesCourbeComponent,
        TacheRecComponent,
        TacheRecEmpComponent,
        CommandeStatComponent,
        BestsellerComponent, MostUsedPiecesComponent, MostConsumedEquipmentComponent, AccessStatsComponent, MaintenanceClaimComponent, AverageAssetLifetimeComponent, FailuresByPeriodComponent]
})
export class HomeComponent {
unreadTasks=null;
respondedTasks=null;
chartData: any;
chartOptions: any;
taskOverviewData: any[] = [];
  isManager: boolean;
  encours=null;
  annuler=null;

  constructor(private userservice:UserService,
    private auth:AuthService) {
      this.isManager = this.auth.getRole() === 'Manager';



  
    
if (auth.getRole()==="Technician"){
    this.userservice.getUserTasks(Number(auth.getUserID())).subscribe(data => {
      console.log(data)
      this.unreadTasks = data.pending_tasks;
      this.respondedTasks = data.completed_tasks;
      this.encours =data.ongoing_tasks;
      this.annuler=data.canceled_tasks;
    });
}else{
  this.userservice.getUsersTasks().subscribe(data => {
    let totalPendingTasks = 0;
    let totalCompletedTasks = 0;
    let totalOngoingTasks = 0;
    let totalCanceledTasks = 0;
    console.log(data);

    data.forEach((item: any) => {
      totalPendingTasks += item.pending_tasks;
      totalCompletedTasks += item.completed_tasks;
      totalOngoingTasks += item.ongoing_tasks;
      totalCanceledTasks += item.canceled_tasks;
    });

    this.unreadTasks = totalPendingTasks;
    this.respondedTasks = totalCompletedTasks;
    this.encours = totalOngoingTasks;
    this.annuler = totalCanceledTasks;
  });
}

    
  }
  

}
