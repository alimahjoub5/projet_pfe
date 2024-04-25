import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../../models/GestionDeStocks/Fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8000/api/fournisseurs'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Créer un nouveau fournisseur
  createFournisseur(fournisseur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fournisseur);
  }

  // Obtenir la liste des fournisseurs
  getFournisseurs(): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(this.apiUrl);
  }

  // Obtenir un fournisseur par son ID
  getFournisseurById(fournisseurId: number): Observable<Fournisseur> {
    const url = `${this.apiUrl}/${fournisseurId}`;
    return this.http.get<Fournisseur>(url);
  }

  // Mettre à jour un fournisseur
  updateFournisseur(fournisseurId: number, updateFournisseur: any): Observable<any> {
    const url = `${this.apiUrl}/${fournisseurId}`;
    return this.http.put<Fournisseur>(url, updateFournisseur);
  }

  // Supprimer un fournisseur
  deleteFournisseur(fournisseurId: number): Observable<void> {
    const url = `${this.apiUrl}/${fournisseurId}`;
    return this.http.delete<void>(url);
  }
}
