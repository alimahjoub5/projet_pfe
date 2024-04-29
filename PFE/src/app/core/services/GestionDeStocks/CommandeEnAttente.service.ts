import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeEnAttente } from '../../models/GestionDeStocks/CommandeEnAttente';

@Injectable({
  providedIn: 'root'
})
export class CommandeEnAttenteService {
  apiUrl = 'http://localhost:8000/api/commandes'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Enregistrer une commande en attente
  enregistrerCommande(commande: CommandeEnAttente): Observable<any> {
    return this.http.post(this.apiUrl, commande);
  }
 
  // Récupérer toutes les commandes en attente
  getCommandesEnAttente(): Observable<CommandeEnAttente[]> {
    return this.http.get<CommandeEnAttente[]>(this.apiUrl);
  }

  // Récupérer une commande en attente par son ID
  getCommandeEnAttenteById(commandeId: number): Observable<CommandeEnAttente> {
    const url = `${this.apiUrl}/${commandeId}`;
    return this.http.get<CommandeEnAttente>(url);
  }

  // Créer une nouvelle commande en attente
  createCommandeEnAttente(commandeEnAttente: CommandeEnAttente): Observable<CommandeEnAttente> {
    return this.http.post<CommandeEnAttente>(this.apiUrl, commandeEnAttente);
  }

  // Mettre à jour une commande en attente existante
  updateCommandeEnAttente(commande_id: number , updatedCommande: CommandeEnAttente): Observable<CommandeEnAttente> {
    const url = `${this.apiUrl}/${commande_id}`;
    return this.http.put<CommandeEnAttente>(url, updatedCommande);
  }

  // Supprimer une commande en attente
  deleteCommandeEnAttente(commandeId: number): Observable<any> {
    const url = `${this.apiUrl}/${commandeId}`;
    return this.http.delete(url);
  }
}
