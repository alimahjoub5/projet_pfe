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

  updateUser(user: User,userId: string): Observable<User> {
    console.log(user.UserID+" "+userId)
    const headers = this.authService.includeAuthToken();
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<User>(url, user, headers);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.authService.includeAuthToken();
    return this.http.delete<void>(url, headers);
  }

  toggleUserStatus(user: User): Observable<User> {
    const newStatus = !user.Active; // Inverser le statut actuel
    const headers = this.authService.includeAuthToken();
    return this.http.put<User>(`${this.apiUrl}/${user.UserID}/status`, { Active: newStatus },headers);
  }
/*
  getTechnicians(): Observable<User[]> {
    const url = `${this.apiUrl}/technicians`;
    return this.http.get<User[]>(url,headers);
  }*/
  getTechnicians(): Observable<User[]> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<User[]>(`http://localhost:8000/api/technicians`,headers);
  }

  getUsername(userID: number): Observable<string> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<string>(`${this.apiUrl}/${userID}/username`,headers);
  }


  assignTechnicianToTicket(ticketId: number, userId: number): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.put<any>(`${this.apiUrl}/tickets/${ticketId}/assign-technician`, { UserID: userId },headers);
  }
  
}
