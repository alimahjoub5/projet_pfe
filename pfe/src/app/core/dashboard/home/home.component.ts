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
  unreadTasks: number = 0;
  respondedTasks: number = 0;
  encours: number = 0;
  annuler: number = 0;
  isManager: boolean;
  isTechnician: boolean;
  isMagasinier: boolean;
  isAdmin: boolean;

  constructor(private userService: UserService, private auth: AuthService) {
    const role = this.auth.getRole();
    this.isManager = role === 'Manager';
    this.isTechnician = role === 'Technician';
    this.isMagasinier = role === 'stockHolder';
    this.isAdmin = role === 'Admin';

    if (this.isTechnician) {
      this.userService.getUserTasks(Number(this.auth.getUserID())).subscribe(data => {
        this.unreadTasks = data.pending_tasks;
        this.respondedTasks = data.completed_tasks;
        this.encours = data.ongoing_tasks;
        this.annuler = data.canceled_tasks;
      });
    } else {
      this.userService.getUsersTasks().subscribe(data => {
        let totalPendingTasks = 0;
        let totalCompletedTasks = 0;
        let totalOngoingTasks = 0;
        let totalCanceledTasks = 0;

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
