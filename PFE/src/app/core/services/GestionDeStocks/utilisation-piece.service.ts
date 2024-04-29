import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisationPiece } from '../../models/GestionDeStocks/UtilisationPiece';

@Injectable({
  providedIn: 'root'
})
export class UtilisationPieceService {
  private apiUrl = 'http://localhost:8000/api/utilisation'; // Remplacez ceci par l'URL de votre API Laravel

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les utilisations de pièces
  getUtilisationPieces(): Observable<any> { 
    return this.http.get<UtilisationPiece>(this.apiUrl);
  }
  getAllPieces(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Retourner un Observable de tableau de Piece
  }
  
  // Méthode pour récupérer une utilisation de pièce par son ID
  getUtilisationPieceById(utilisationId: number): Observable<UtilisationPiece> {
    const url = `${this.apiUrl}/${utilisationId}`;
    return this.http.get<UtilisationPiece>(url);
  }

  // Méthode pour créer une nouvelle utilisation de pièce
  createUtilisationPiece(utilisationPiece: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, utilisationPiece);
  }
 

  // Méthode pour mettre à jour une utilisation de pièce existante
 
 updateUtilisationPiece(utilisation_id: number , updateutilisation:UtilisationPiece): Observable<UtilisationPiece> {
  const url = `${this.apiUrl}/${utilisation_id}`;
  return this.http.put<UtilisationPiece>(url, updateutilisation);
}


  // Méthode pour supprimer une utilisation de pièce
  deleteUtilisationPiece(utilisationId: number): Observable<void> {
    const url = `${this.apiUrl}/${utilisationId}`;
    return this.http.delete<void>(url);
  }
}
