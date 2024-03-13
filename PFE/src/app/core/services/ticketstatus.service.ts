import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketStatus } from '../models/ticketstatus'; // Assurez-vous d'importer votre interface TicketStatus

@Injectable({
  providedIn: 'root'
})
export class TicketStatusService {

  private apiUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer tous les statuts de ticket
  getAllTicketStatuses(): Observable<TicketStatus[]> {
    return this.http.get<TicketStatus[]>(`${this.apiUrl}/ticket-statuses`);
  }

  // Récupérer un statut de ticket par son ID
  getTicketStatusById(id: number): Observable<TicketStatus> {
    return this.http.get<TicketStatus>(`${this.apiUrl}/ticket-statuses/${id}`);
  }

  // Ajouter un nouveau statut de ticket
  addTicketStatus(ticketStatus: TicketStatus): Observable<TicketStatus> {
    return this.http.post<TicketStatus>(`${this.apiUrl}/ticket-statuses`, ticketStatus);
  }

  // Mettre à jour un statut de ticket existant
  updateTicketStatus(id: number, ticketStatus: TicketStatus): Observable<TicketStatus> {
    return this.http.put<TicketStatus>(`${this.apiUrl}/ticket-statuses/${id}`, ticketStatus);
  }

  // Supprimer un statut de ticket
  deleteTicketStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ticket-statuses/${id}`);
  }
}
