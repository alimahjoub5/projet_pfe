import { Component , OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MenuItem} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RouterModule} from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserService } from 'src/app/core/services/user-service.service';
import { User } from 'src/app/core/models/User';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
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
    ProgressSpinnerModule,
CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
 
})
export class UserlistComponent implements OnInit{
  users: User[];
  isLoading: boolean;

   //-------------------------------------------

   constructor( private userService: UserService ) {
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
this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

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