import { Component, ViewChild } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import {StyleClassModule} from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule,StyleClassModule,PasswordModule,
    ButtonModule,InputTextModule,ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('password') passwordInput: any; // Accéder à l'élément HTML du mot de passe

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Valider le formulaire
    if (this.loginForm.invalid) {
      return;
    }

    // Vérifier si le champ "password" est vide
    if (!this.passwordInput.nativeElement.value) {
      this.errorMessage = 'Le mot de passe est obligatoire.';
      return;
    }

    // Soumettre le formulaire (implémentez votre logique ici)
    console.log('Formulaire soumis');
  }
}
