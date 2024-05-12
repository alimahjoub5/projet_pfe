import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-assign-ticket-technician',
  standalone: true,
  imports : [AutoCompleteModule,FormsModule],
  templateUrl: './assign-ticket-technician.component.html',
  styleUrl: './assign-ticket-technician.component.scss'
})
export class AssignTicketTechnicianComponent {
  @Input() ticketId: string | undefined;
  Technicians: User[] | undefined;
  selectedTechnician: User | null = null;
  filteredTechnicians: User[] | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTechnicians().subscribe(
      (technicians: User[]) => {
        this.Technicians = technicians;
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
  }

  filterTechnicians(event: any) {
    let filtered: User[] = [];
    let query = event.query;

    if (this.Technicians) {
      filtered = this.Technicians.filter((technician) =>
        technician.Username.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    this.filteredTechnicians = filtered;
  }

  onTechnicianSelect(event: any) {
    this.selectedTechnician = event.value;
  }

  saveSelectedTechnician() {
    if (this.selectedTechnician && this.ticketId) {
      // Envoyer une requête pour affecter le ticket à l'utilisateur sélectionné
      this.userService.assignTechnicianToTicket(Number(this.ticketId), this.selectedTechnician.UserID).subscribe(
        (response) => {
          console.log('Technician assigned to ticket successfully:', response);
          // Gérer la réponse ici, par exemple, afficher un message de succès à l'utilisateur
        },
        (error) => {
          console.error('Failed to assign technician to ticket:', error);
          // Gérer l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.warn('No ticket or technician selected.');
      // Vous pouvez gérer le cas où aucun ticket ou technicien n'est sélectionné, comme afficher un message à l'utilisateur pour sélectionner un technicien.
    }
  }
  


}
