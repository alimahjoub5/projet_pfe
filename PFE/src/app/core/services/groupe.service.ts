import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groupe } from '../models/groupe'; // Assurez-vous d'importer votre interface Groupe

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private apiUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer tous les groupes
  getAllGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${this.apiUrl}/technician-groups`);
  }

  // Récupérer un groupe par son ID
  getGroupeById(id: number): Observable<Groupe> {
    return this.http.get<Groupe>(`${this.apiUrl}/technician-groups/${id}`);
  }

  // Ajouter un nouveau groupe
  addGroupe(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(`${this.apiUrl}/technician-groups`, groupe);
  }

  // Mettre à jour un groupe existant
  updateGroupe(id: number, groupe: Groupe): Observable<Groupe> {
    return this.http.put<Groupe>(`${this.apiUrl}/technician-groups/${id}`, groupe);
  }

  // Supprimer un groupe
  deleteGroupe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/technician-groups/${id}`);
  }
}
