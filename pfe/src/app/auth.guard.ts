import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
      if (localStorage.getItem('Token')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }


}
