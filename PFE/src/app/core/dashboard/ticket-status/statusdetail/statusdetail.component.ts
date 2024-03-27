import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketStatus } from 'src/app/core/models/ticketstatus';
import { TicketStatusService } from 'src/app/core/services/ticketstatus.service';

@Component({
  selector: 'app-statusdetail',
  standalone: true,
  imports: [],
  templateUrl: './statusdetail.component.html',
  styleUrl: './statusdetail.component.scss'
})
export class StatusdetailComponent  implements OnInit{

  StatusCodeID: number;
  ticketStatus: TicketStatus;
  isLoading = false;

  constructor(private route: ActivatedRoute, private ticketstatusservice : TicketStatusService) { }

  ngOnInit(): void {
    this.StatusCodeID = +this.route.snapshot.paramMap.get('id');
    this.getStatusDetails(this.StatusCodeID);
  }

  getStatusDetails(StatusCodeID: number): void {
    this.isLoading = true; // Afficher le spinner avant de récupérer les données
    this.ticketstatusservice.getTicketStatusById(this.StatusCodeID).subscribe(ticketStatus => {
      this.ticketStatus = ticketStatus;
      this.isLoading = false; // Cacher le spinner après la récupération des données
    });
  }

  printDocument(): void {
    window.print();
  }

}

