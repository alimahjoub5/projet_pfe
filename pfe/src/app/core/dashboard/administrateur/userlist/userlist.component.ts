import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserService } from 'src/app/core/services/user-service.service';
import { User } from 'src/app/core/models/User';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-userlist',
  
  standalone: true,
  imports: [FormsModule,
    ButtonModule,
     ReactiveFormsModule, 
    AutoCompleteModule,
    TableModule,DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    SplitButtonModule,
    RouterModule,
    NgxSpinnerModule,
CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
 
})
export class UserlistComponent implements OnInit{
  users: User[];
  isLoading: boolean;
cols: any;

   //-------------------------------------------

   constructor( 
    private userService: UserService,
    private spinner: NgxSpinnerService,
    ) {
    this.isLoading = true; // Show spinner before fetching data

    this.userService.getUsers()
    .subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
      }

    );


     this.isLoading = false; // Hide spinner after data retrieval

    }

  ngOnInit(): void {
    this.spinner.show(); // Show the spinner
this.loadUsers();
  }

  //-----------------------------------------------------------------------

  toggleUserStatus(user: User): void {
    this.userService.toggleUserStatus(user).subscribe(updatedUser => {
      user.Active = updatedUser.Active; // Mettre à jour le statut de l'utilisateur dans la liste des utilisateurs
      this.loadUsers();
    
    });
  }
  loadUsers() {
    this.isLoading=true;
    this.spinner.show(); // Show the spinner
    setTimeout(() => {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.spinner.hide(); // Hide the spinner when data is loaded
  }, 2000);
  this.isLoading=false;
}


  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  
      items: MenuItem[];

selectedCustomers: any;


}