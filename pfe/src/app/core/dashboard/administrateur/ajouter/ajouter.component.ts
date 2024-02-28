import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule]
})
export class AjouterComponent implements OnInit {
  ticketForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      user: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      username: [''],
      role: [''],
      telephone: [''],
      email: ['', [Validators.required, Validators.email]],
      isActive: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      return;
    }

    const user: User = this.ticketForm.value;
    this.userService.addUser(user)
      .subscribe(
        response => {
          console.log('User added successfully:', response);
          // Réinitialiser le formulaire après l'ajout réussi
          this.ticketForm.reset();
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
  }
}
