import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groupe } from '../models/groupe'; // Assurez-vous d'importer votre interface Groupe
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private apiUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupérer tous les groupes
  getAllGroupes(): Observable<Groupe[]> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Groupe[]>(`${this.apiUrl}/technician-groups`, headers);
  }

  // Récupérer un groupe par son ID
  getGroupeById(id: number): Observable<Groupe> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Groupe>(`${this.apiUrl}/technician-groups/${id}`, headers);
  }

  // Ajouter un nouveau groupe
  addGroupe(groupe: Groupe): Observable<Groupe> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<Groupe>(`${this.apiUrl}/technician-groups`, groupe, headers);
  }

  // Mettre à jour un groupe existant
  updateGroupe(id: number, groupe: Groupe): Observable<Groupe> {
    const headers = this.authService.includeAuthToken();
    return this.http.put<Groupe>(`${this.apiUrl}/technician-groups/${id}`, groupe, headers);
  }

  // Supprimer un groupe
  deleteGroupe(id: number): Observable<void> {
    const headers = this.authService.includeAuthToken();
    return this.http.delete<void>(`${this.apiUrl}/technician-groups/${id}`, headers);
  }
  assignTicketToGroup(ticketId: number, groupId: number): Observable<any> {
    const url = `${this.apiUrl}/tickets/${ticketId}/assign-to-group`;
    const headers = this.authService.includeAuthToken();
    return this.http.post<any>(url, { group_id: groupId }, headers);
  }

  getGroupNameById(id: number): Observable<any> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<any>(`${this.apiUrl}/group/${id}`, headers);
  }
}
