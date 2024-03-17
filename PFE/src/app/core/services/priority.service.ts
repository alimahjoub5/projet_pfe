import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Priority } from '../models/Priority';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private apiUrl = 'http://localhost:8000/api/priorities';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPriorities(): Observable<Priority[]> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Priority[]>(this.apiUrl, headers);
  }

  getPriorityById(id: number): Observable<Priority> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Priority>(`${this.apiUrl}/${id}`, headers);
  }

  createPriority(priority: Priority): Observable<Priority> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<Priority>(this.apiUrl, priority, headers);
  }

  updatePriority(id: number, priority: Priority): Observable<Priority> {
    const headers = this.authService.includeAuthToken();
    return this.http.put<Priority>(`${this.apiUrl}/${id}`, priority, headers);
  }

  deletePriority(id: number): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.delete(`${this.apiUrl}/${id}`, headers);
  }

  //-----------------------------------------------------------------------------

  getPriorityName(priorityId: number): Observable<string> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<string>(`${this.apiUrl}/${priorityId}/name`, headers);
  }
}
