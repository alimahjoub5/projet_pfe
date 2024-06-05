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
  getLastID(): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<any>(`${this.apiUrl}/ticket/last`, headers);
  }
  getTicketById(id: number): Observable<Ticket> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Ticket>(`${this.apiUrl}/ticket/${id}`, headers);
  }

  addTicket(ticketData: Ticket): Observable<any> {
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

  updateDatePriseEnCharge(ticketId: number, datepriseencharge: string): Observable<any> {
    const headers = this.authService.includeAuthToken();
    const formattedDate = datepriseencharge.toString().slice(0, 19).replace('T', ' ');
    // Utilisez la clé correcte pour envoyer la date formatée dans la demande
    return this.http.put(`${this.apiUrl}/tickets/${ticketId}/datepriseencharge`, { datepriseencharge: formattedDate }, headers );
  }

  updateDates(ticketId: number, datedereparage: string, datedevalidation: string): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.put(`${this.apiUrl}/tickets/${ticketId}/dates`, { datedereparage, datedevalidation }, headers);
  }


    // Méthode pour fermer un ticket
    closeTicket(id: number): Observable<any> {
          const headers = this.authService.includeAuthToken();
      const url = `${this.apiUrl}/tickets/${id}/close`;
      return this.http.put(url, {},headers);
    }
  
    // Méthode pour mettre un ticket en cours
    startTicket(id: number): Observable<any> {
          const headers = this.authService.includeAuthToken();
      const url = `${this.apiUrl}/tickets/${id}/start`;
      return this.http.put(url, {},headers);
    }

  // Méthode pour obtenir les tickets par AssigneeID
  getTicketsByAssignee(assigneeId: number): Observable<any> {
    const headers = this.authService.includeAuthToken();
    const url = `${this.apiUrl}/tickets/assignee/${assigneeId}`;
    return this.http.get(url,headers);
  }


  
  


}
