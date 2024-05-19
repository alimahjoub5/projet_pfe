import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    InputTextModule,
    CommonModule

  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  user: User;
  isLoading: boolean;

  constructor(private messageService: MessageService,private userService: UserService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserDetails(Number(this.authservice.getUserID()));
  }
  getUserDetails(userId: number): void {
    this.isLoading = true; // Show spinner before fetching data
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      console.log(user)
      this.isLoading = false; // Hide spinner after data retrieval
    });
  }
  onEdit(): void {
    // Logique pour éditer le profil
    this.messageService.add({severity: 'info', summary: 'Edit', detail: 'Edit profile clicked'});
  }
}