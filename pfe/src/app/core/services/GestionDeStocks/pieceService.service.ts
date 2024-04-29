// piece.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../../models/GestionDeStocks/piece';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private apiUrl = 'http://localhost:8000/api/pieces'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour créer une nouvelle pièce
  createPiece(piece: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, piece);
  }

  getAllPieces(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Retourner un Observable de tableau de Piece
  }
  
 // Mettre à jour une pièce existante
 updatePiece(pieceId: number, updatedPiece: Piece): Observable<Piece> {
  const url = `${this.apiUrl}/${pieceId}`;
  return this.http.put<Piece>(url, updatedPiece);
}

  // Récupérer une pièce par son ID
  getPieceById(pieceId: number): Observable<Piece> {
    const url = `${this.apiUrl}/${pieceId}`;
    return this.http.get<Piece>(url);
  }

  deletePiece(pieceId: number): Observable<void> {
    const url = `${this.apiUrl}/${pieceId}`;
    
    return this.http.delete<void>(url);
  }
  // Autres méthodes pour mettre à jour, supprimer ou récupérer une seule pièce si nécessaire
}
