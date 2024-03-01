import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../core/services/user-service.service';
import { User } from '../core/models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports : [ReactiveFormsModule,CommonModule  ]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: User[];

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Role: ['', Validators.required],
      Active: [true]
    });

    //-------------------------------------------
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
  }


  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user: User = this.userForm.value;
    this.userService.addUser(user)
      .subscribe(
        response => {
          console.log('User added successfully:', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.userForm.reset();
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
  }
}
