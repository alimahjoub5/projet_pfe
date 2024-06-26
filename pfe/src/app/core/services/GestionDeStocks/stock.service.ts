import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { StockPiece } from '../../models/GestionDeStocks/StockPiece';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8000/api/stock-pieces'; // Remplacez ceci par l'URL de votre API Laravel

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les stocks de pièces
  getStockPieces(): Observable<StockPiece[]> {
    return this.http.get<StockPiece[]>(this.apiUrl);
  }

  // Méthode pour récupérer un stock de pièces par son ID
  getStockPieceById(stockId: number): Observable<StockPiece> {
    const url = `${this.apiUrl}/${stockId}`;
    return this.http.get<StockPiece>(url);
  }

  // Méthode pour créer un nouveau stock de pièces
  createStockPiece(stockPiece: StockPiece): Observable<StockPiece> {
    return this.http.post<StockPiece>(this.apiUrl, stockPiece);
  }

  // Méthode pour mettre à jour un stock de pièces existant
  updateStockPiece(stockId: number, updatedStock: StockPiece): Observable<StockPiece> {
    const url = `${this.apiUrl}/${stockId}`;
    return this.http.put<StockPiece>(url, updatedStock);
  }

  // Méthode pour supprimer un stock de pièces
  deleteStockPiece(stockId: number): Observable<any> {
    const url = `${this.apiUrl}/${stockId}`;
    return this.http.delete(url);
  }

  // Méthode pour mettre à jour la quantité d'un stock de pièces
  updateStockQuantity(stockPieceId: number, quantity: number, modifyBy: string): Observable<any> {
    const url = `${this.apiUrl}/stock/${stockPieceId}`; // Utilisation de l'URL correcte
    const body = { quantity, modify_by: modifyBy };

    return this.http.put(url, body)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
