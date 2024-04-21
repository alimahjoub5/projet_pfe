import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../../models/GestionDeStocks/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  apiUrl = 'http://localhost:8000/api/commandes'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  enregistrerCommande(commande: Commande): Observable<any> {
    return this.http.post(this.apiUrl, commande);
  }
}
