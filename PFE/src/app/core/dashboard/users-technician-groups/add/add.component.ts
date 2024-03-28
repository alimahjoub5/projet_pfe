import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { Groupe } from 'src/app/core/models/groupe';
import { GroupeService } from 'src/app/core/services/groupe.service';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  groupes: Groupe[] = [];
  selectedGroupe: Groupe | undefined;
  user: User[] = [];
  selectedUser: User | undefined;

  constructor(private groupeService: GroupeService, private userservice:UserService) { }

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
    this.userservice
    .getUsers().subscribe(user => {
      this.user = user;
    });
  }

  onGroupeSelected(groupe: Groupe): void {
    this.selectedGroupe = groupe;
  }
  onUserSelected(user: User): void {
    this.selectedUser = user;
  }

}