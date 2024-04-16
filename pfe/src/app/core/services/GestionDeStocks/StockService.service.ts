import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../../models/GestionDeStocks/stocks';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:8000/api/stocks'; // Mettez l'URL de votre API backend ici

  constructor(private http: HttpClient) { }

 // Méthode pour récupérer tous les stocks
 getAllStocks(): Observable<Stock> { 
  return this.http.get<Stock>(this.apiUrl);
}
  // Méthode pour récupérer un stock par son ID
  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${id}`);
  }

createStock(stockData: FormData): Observable<FormData> {
  return this.http.post<FormData>(this.apiUrl, stockData);
}

  // Méthode pour mettre à jour un stock existant
  updateStock(id: number, stockData: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${id}`, stockData);
  }

  // Méthode pour supprimer un stock existant
  deleteStock(id: number): Observable<Stock> {
    return this.http.delete<Stock>(`${this.apiUrl}/${id}`);
  }
}
