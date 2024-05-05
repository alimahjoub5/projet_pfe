import { Component, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';   

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
SplitterModule,
CommonModule,
FormsModule,
PanelModule,
ButtonModule,
InputTextModule
],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
  export class ChatComponent implements OnInit {
    users: User[] = [];
    usersWithConversation: User[] = []; // Liste des utilisateurs avec qui une conversation existe
    selectedUser: User | null = null; // Utilisateur sélectionné pour afficher les messages
    messages: any[] = []; // Liste des messages entre l'utilisateur actuel et l'utilisateur sélectionné
  message: any;


  userId : Number;
  receiverId: Number;
  nomprenom: string;

    constructor(
      private authService: AuthService,
      private chatService: ChatService,
      private userService: UserService
    ) { }
  
    ngOnInit(): void {
      this.userId = Number(this.authService.getUserID());
      this.loadUsers();
    }
    loadUsers() {
      setTimeout(() => {
        this.userService.getUsers().subscribe(users => {
          this.users = users;
          this.checkAllConversations();
        });
      }, 2000);
    }
  
    checkAllConversations(): void {
      const userId = this.authService.getUserID();
      
      // Filtrer l'utilisateur authentifié de la liste des utilisateurs
      const filteredUsers = this.users.filter(user => user.UserID.toString() !== userId);
      
      for (const user of filteredUsers) {
        this.checkConversation(userId, user.UserID.toString());
      }
    }
    
  
    checkConversation(userId1: string, userId2: string): void {
      this.chatService.checkConversation(userId1, userId2).subscribe(
        response => {
          if (response) {
            // Si une conversation existe, ajoutez l'utilisateur à la liste
            const userWithConversation = this.users.find(user => user.UserID.toString() === userId2);
            if (userWithConversation) {
              this.nomprenom=userWithConversation.FirstName+' '+userWithConversation.LastName;
              this.usersWithConversation.push(userWithConversation);
            }
            console.log(userWithConversation);
          }
        },
        error => {
          console.error('Erreur lors de la vérification de la conversation :', error);
          // Gestion des erreurs
        }
      );
    }

    showMessages(user: User): void {
      this.selectedUser = user;
      // Vous pouvez implémenter ici la logique pour charger et afficher les messages avec cet utilisateur
    }

    loadMessagesWithUser(recipientId: number) {
      this.chatService.getMessages(Number(this.userId), recipientId).subscribe(
        (data) => {
          this.receiverId=recipientId;
          this.messages = data.messages; // Assurez-vous que 'data' est un tableau de messages
        },
        (error) => {
          console.error('Erreur lors du chargement des messages:', error);
        }
      );
    }



    sendMessage(): void {
      if (this.message.trim() === '') {
        // Empêcher l'envoi d'un message vide
        return;
      }
    
      const messageData = {
        MessageID:null,
        SenderID: this.userId,
        RecipientID: this.receiverId,
        MessageContent: this.message
      };
      console.log(messageData);

      this.chatService.sendMessage(messageData).subscribe(
        response => {
          // Gérer la réponse réussie du serveur
          console.log('Message envoyé avec succès !');
          // Réinitialiser le champ de saisie après l'envoi du message
          this.message = '';
          this.loadMessagesWithUser(Number(this.receiverId));
        },
        error => {
          // Gérer les erreurs lors de l'envoi du message
          console.error('Une erreur s\'est produite lors de l\'envoi du message : ', error);
          // Afficher un message d'erreur à l'utilisateur ou prendre d'autres mesures nécessaires
          console.log(error); // Ajoutez cette ligne pour afficher le contenu de l'objet d'erreur
        }
      );
    }
    

  }