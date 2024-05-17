import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
  RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {


  credentialsForm: FormGroup;
errorMessage: string ="";

  constructor(private authService: AuthService, private fb: FormBuilder,public layoutService: LayoutService,private router:Router) {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }
  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est connecté, rediriger vers une autre page, par exemple le tableau de bord
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.credentialsForm.valid) {
      // Envoyer les informations de connexion au service d'authentification
      const credentials = this.credentialsForm.value;
      this.authService.login(credentials)
      .subscribe(
        response => {
          // Traitement de la réponse
          console.log('Réponse de connexion:', response);
          // Rediriger l'utilisateur vers une page appropriée, par exemple, le tableau de bord
          this.router.navigate(['/home']);
        },
        error => {
          // Gestion des erreurs d'authentification
          console.error('Erreur de connexion:', error);
          if (error.status === 401) {
            // Si l'erreur est due à des informations d'identification invalides, afficher un message d'erreur
            this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
          } else {
            // Pour d'autres erreurs, afficher un message générique
            this.errorMessage = 'Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer.';
          }
        }
      );
      
    } else {
      // Afficher les erreurs de validation dans le formulaire
      this.markFormGroupTouched(this.credentialsForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get email() { return this.credentialsForm.get('email'); }
  get password() { return this.credentialsForm.get('password'); }
}