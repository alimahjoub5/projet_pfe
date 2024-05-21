import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [FormsModule,
  ButtonModule,
  CardModule,
  ToastModule,
  ReactiveFormsModule ,
  InputTextModule,
  CommonModule,
  RouterModule
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  isInvalidPassword: boolean = false;
  isInvalidConfirmPassword: boolean = false;
constructor(
  private passwordService :UserService,
  private router:Router
){}
  validatePassword() {
    this.isInvalidPassword = this.password.length < 8;
  }

  validateConfirmPassword() {
    this.isInvalidConfirmPassword = this.password !== this.confirmPassword;
  }

  submit() {
    this.passwordService.changePassword(this.password, this.confirmPassword)
      .subscribe(
        response => {
          console.log('Password changed successfully');
          this.router.navigate(['/home']);

          // Handle success - maybe show a success message to the user
        },
        error => {
          console.error('Error changing password:', error);
          // Handle error - maybe show an error message to the user
        }
      );
  }
  skip() {
    this.passwordService.skipPasswordReset()
      .subscribe(
        response => {
          console.log('Password skipped successfully');
          this.router.navigate(['/home']);

          // Handle success - maybe show a success message to the user
        },
        error => {
          console.error('Error changing password:', error);
          // Handle error - maybe show an error message to the user
        }
      );
  }
}