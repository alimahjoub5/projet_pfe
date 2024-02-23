// assignee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssigneeService {
  private apiUrl = './api/user.json'; // ajustez l'URL de votre API

  constructor(private http: HttpClient) { }

  getAssignees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
