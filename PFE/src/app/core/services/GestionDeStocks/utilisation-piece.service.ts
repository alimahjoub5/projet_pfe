import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisationPiece } from '../../models/GestionDeStocks/UtilisationPiece';

@Injectable({
  providedIn: 'root'
})
export class UtilisationPieceService {
  private apiUrl = 'http://localhost:8000/api/utilisation-pieces'; // Remplacez ceci par l'URL de votre API Laravel

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les utilisations de pièces
  getUtilisationPieces(): Observable<UtilisationPiece[]> {
    return this.http.get<UtilisationPiece[]>(this.apiUrl);
  }

  // Méthode pour récupérer une utilisation de pièce par son ID
  getUtilisationPieceById(utilisationId: number): Observable<UtilisationPiece> {
    const url = `${this.apiUrl}/${utilisationId}`;
    return this.http.get<UtilisationPiece>(url);
  }

  // Méthode pour créer une nouvelle utilisation de pièce
  createUtilisationPiece(utilisationPiece: UtilisationPiece): Observable<UtilisationPiece> {
    return this.http.post<UtilisationPiece>(this.apiUrl, utilisationPiece);
  }

  // Méthode pour mettre à jour une utilisation de pièce existante
  updateUtilisationPiece(utilisationPiece: UtilisationPiece): Observable<UtilisationPiece> {
    const url = `${this.apiUrl}/${utilisationPiece.utilisation_id}`;
    return this.http.put<UtilisationPiece>(url, utilisationPiece);
  }

  // Méthode pour supprimer une utilisation de pièce
  deleteUtilisationPiece(utilisationId: number): Observable<void> {
    const url = `${this.apiUrl}/${utilisationId}`;
    return this.http.delete<void>(url);
  }
}
