import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Priority } from '../models/Priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private apiUrl = 'http://localhost:8000/api/priorities';

  constructor(private http: HttpClient) { }

  getAllPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.apiUrl);
  }

  getPriorityById(id: number): Observable<Priority> {
    return this.http.get<Priority>(`${this.apiUrl}/${id}`);
  }

  createPriority(priority: Priority): Observable<Priority> {
    return this.http.post<Priority>(this.apiUrl, priority);
  }

  updatePriority(id: number, priority: Priority): Observable<Priority> {
    return this.http.put<Priority>(`${this.apiUrl}/${id}`, priority);
  }

  deletePriority(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
