import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour demander un lien de réinitialisation de mot de passe
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/email`, { email });
  }

  // Méthode pour réinitialiser le mot de passe
  resetPassword(data: { token: string, email: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/reset`, data);
  }
}
