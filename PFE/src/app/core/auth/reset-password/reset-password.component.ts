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
import { PasswordResetService } from '../../services/passwordReset.service';
import { MessageService } from 'primeng/api';

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
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private passwordResetService: PasswordResetService) { }

  ngOnInit(): void {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.credentialsForm.valid) {
      this.passwordResetService.resetPassword(this.credentialsForm.value.email).subscribe(
        response => {
          this.errorMessage = 'Le mot de passe a été réinitialisé et envoyé par email.';
        },
        error => {
          this.errorMessage = 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.';
          console.error('Erreur:', error);
        }
      );
    }
  }
}
