import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user-service.service';
@Component({
  selector: 'app-assign-tache-technician',
  standalone: true,
  imports: [AutoCompleteModule,FormsModule],
  templateUrl: './assign-tache-technician.component.html',
  styleUrl: './assign-tache-technician.component.scss'
})
export class AssignTacheTechnicianComponent  implements OnInit{
  
  @Output() userSelected = new EventEmitter<User>();


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
    this.userSelected.emit(this.selectedTechnician); // Émettre la valeur sélectionnée vers le parent
  }


  saveSelectedTechnician() {
   
  }
  


}
 {

}
