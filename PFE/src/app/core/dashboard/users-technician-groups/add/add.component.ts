import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { UserService } from 'src/app/core/services/user-service.service';
import { UsersTechnicianGroupsService } from 'src/app/core/services/user-tech.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {

  groupes: Groupe[];
  selectedGroupe: number | undefined;
  users: User[] = [];
  selectedUser: number | undefined;

  constructor(private groupeService: GroupeService, private userService: UserService,private usertech:UsersTechnicianGroupsService) { }

  ngOnInit(): void {
    this.getAllGroupes();
    this.getAllUsers();
  }

  getAllGroupes(): void {
    this.groupeService.getAllGroupes().subscribe(groupes => {
      this.groupes = groupes;
    });
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  assignUserToGroup(): void {
    if (this.selectedGroupe && this.selectedUser) {
      this.usertech.assignUserToGroup(this.selectedUser, this.selectedGroupe).subscribe(
        response => {
          console.log('Assignation réussie');
          // Réinitialiser les sélections après l'assignation réussie si nécessaire
          this.selectedGroupe = undefined;
          this.selectedUser = undefined;
        },
        error => {
          console.error('Erreur lors de l\'assignation :', error);
        }
      );
    }
  }

}