// societe.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Societe } from '../models/societe';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  private apiUrl = 'http://localhost:8000/api/societes';

  constructor(private http: HttpClient , private authService: AuthService) { }

  getAllSocietes(): Observable<Societe> {
    return this.http.get<Societe>(this.apiUrl);
  }

  getSocieteById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createSociete(societe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, societe);
  }
  
  


  updateSociete(societeId: number, updateSociete : any): Observable<any> {
    const url = `${this.apiUrl}/${societeId}`;
    return this.http.put<Societe>(url, updateSociete);
  }

  deleteSociete(societeId: number): Observable<void> {
    const url = `${this.apiUrl}/${societeId}`;
    return this.http.delete<void>(url);
  }
  assignTicketToSociete(ticketId: number, id: number): Observable<any> {
    const url = `${this.apiUrl}/tickets/${ticketId}/assign-to-societe`;
    const headers = this.authService.includeAuthToken();
    return this.http.put<any>(url, { SocieteID: id }, headers);
  }
}
