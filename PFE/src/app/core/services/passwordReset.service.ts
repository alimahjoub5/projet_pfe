import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private apiUrl = 'http://localhost:8000/api/reset-password';
  constructor(private http: HttpClient) { }

  resetPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
