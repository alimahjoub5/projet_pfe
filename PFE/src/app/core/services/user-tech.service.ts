import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usertech } from '../models/user-tech';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersTechnicianGroupsService {

  private baseUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsersTechnicianGroups(): Observable<Usertech> {
    const headers = this.authService.includeAuthToken();

    return this.http.get<Usertech>(`${this.baseUrl}/user-technician-groups`,headers);
  }

  getUserTechnicianGroup(groupId: number): Observable<Usertech> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Usertech>(`${this.baseUrl}/user-technician-groups/${groupId}`,headers);
  }

  assignUserToGroup(userId: number, groupId: number): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<any>(`${this.baseUrl}/user-technician-groups/assign`, { UserID: userId, GroupID: groupId }, headers);
  }

  removeUserFromGroup(userId: number, groupId: number): Observable<any> {
    const headers = this.authService.includeAuthToken();

    return this.http.post<any>(`${this.baseUrl}/user-technician-groups/remove`, { UserID: userId, GroupID: groupId }, headers);
  }

  getUsersInGroup(groupId: number): Observable<Usertech[]> {
    const headers = this.authService.includeAuthToken();

    return this.http.get<Usertech[]>(`${this.baseUrl}/user-technician-groups/${groupId}/users`, headers);
  }
}
