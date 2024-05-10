import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez 'http://your-api-url' par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllTickets(): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<any>(`${this.apiUrl}/tickets`, headers);
  }

  getTicketById(id: number): Observable<Ticket> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Ticket>(`${this.apiUrl}/ticket/${id}`, headers);
  }

  addTicket(ticketData: any): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.post(`${this.apiUrl}/addTicket`, ticketData, headers);
  }

  updateTicket(id: number, ticketData: any): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.put(`${this.apiUrl}/updateTicket/${id}`, ticketData, headers);
  }

  deleteTicket(id: number): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.delete(`${this.apiUrl}/deleteTicket/${id}`, headers);
  }
  getTicketName(TicketID: number): Observable<string> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<string>(`${this.apiUrl}/ticket/${TicketID}/name`, headers);
  }




  
  


}
