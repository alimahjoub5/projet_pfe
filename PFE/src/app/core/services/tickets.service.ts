import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez 'http://your-api-url' par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/tickets`);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/ticket/${id}`);
  }

  addTicket(ticketData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addTicket`, ticketData);
  }

  updateTicket(id: number, ticketData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateTicket/${id}`, ticketData);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteTicket/${id}`);
  }


  assignTicketToUser(ticketId: number, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/tickets/${ticketId}/assign`, { userId });
  }
  
}
