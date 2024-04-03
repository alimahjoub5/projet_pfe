import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketStatus } from '../models/ticketstatus'; // Assurez-vous d'importer votre interface TicketStatus
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketStatusService {

  private apiUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupérer tous les status de tickets
  getAllTicketStatuses(): Observable<TicketStatus[]> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<TicketStatus[]>(`${this.apiUrl}/ticket-statuses`,headers);
  }

  // Récupérer un status de ticket par son ID
  getTicketStatusById(id: number): Observable<TicketStatus> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<TicketStatus>(`${this.apiUrl}/ticket-statuses/${id}`,headers);
  }

  // Ajouter un nouveau status de ticket
  addTicketStatus(ticketStatus: TicketStatus): Observable<TicketStatus> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<TicketStatus>(`${this.apiUrl}/ticket-statuses`, ticketStatus,headers);
  }

  // Mettre à jour un status de ticket existant
  updateTicketStatus(id: number, ticketStatus: TicketStatus): Observable<TicketStatus> {
    const headers = this.authService.includeAuthToken();
    return this.http.put<TicketStatus>(`${this.apiUrl}/ticket-statuses/${id}`, ticketStatus,headers);
  }

  // Supprimer un status de ticket
  deleteTicketStatus(id: number): Observable<void> {
    const headers = this.authService.includeAuthToken();
    return this.http.delete<void>(`${this.apiUrl}/ticket-statuses/${id}`,headers);
  }
  getStatusName(StatusCodeID: number): Observable<string> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<string>(`${this.apiUrl}/ticket-statuses/${StatusCodeID}/name`, headers);
  }
}
