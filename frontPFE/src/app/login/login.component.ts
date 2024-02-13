import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import {StyleClassModule} from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule,StyleClassModule,PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
