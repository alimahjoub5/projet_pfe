import { Component, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';   
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user-service.service';
import { User } from '../models/User';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SplitterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
  export class ChatComponent implements OnInit {
    users: User[] = [];
    conversationExists: boolean; // Type correct pour 'conversationExists'
  
    constructor(
      private authService: AuthService, // Correction du nom du service
      private chatService: ChatService,
      private userService: UserService
    ) { }
  
    ngOnInit(): void {
      this.loadUsers();
      this.checkAllConversations();
    }

    checkAllConversations(): void {
      const userId = this.authService.getUserID();
      for (const user of this.users) {
        this.checkConversation(userId, user.UserID.toString()); // Correction pour convertir l'ID utilisateur en chaîne de caractères
      }
    }
    
  
    loadUsers() {
      setTimeout(() => {
        this.userService.getUsers().subscribe(users => {
          this.users = users;
        });
      }, 2000);
    }
  
    checkConversation(userId1: string,userId2: string): void {
      this.chatService.checkConversation(userId1, userId2).subscribe(
        response => {
          // Votre logique pour vérifier si la conversation existe
          this.conversationExists = response;
          console.log(response);
        },
        error => {
          console.error('Erreur lors de la vérification de la conversation :', error);
          // Gestion des erreurs
        }
      );
    }
  }