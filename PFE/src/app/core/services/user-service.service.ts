import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; // Remplacez cette URL par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<User[]>(this.apiUrl, headers);
  }

  getUser(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.authService.includeAuthToken();
    return this.http.get<User>(url, headers);
  }

  addUser(user: User): Observable<User> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<User>(this.apiUrl, user, headers);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.authService.includeAuthToken();
    return this.http.delete<void>(url, headers);
  }
}
