import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{Location} from '../../models/GestionDeStocks/Location';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl =  'http://localhost:8000/api/location' ;// Remplacez ceci par l'URL de votre API Laravel
 
  constructor(private http: HttpClient) { }

   // Méthode pour créer une nouvelle location
    createLocation(location: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, location);
  }
  // Méthode pour récupérer toutes les locations
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  // Méthode pour récupérer une location par son ID
  getLocationById(locationId: number): Observable<Location> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.http.get<Location>(url);
  }

 

  // Méthode pour mettre à jour une location existante
  updateLocation(location_id: number,updateLocation:Location ): Observable<Location> {
    const url = `${this.apiUrl}/${location_id}`;
    return this.http.put<Location>(url, updateLocation);
  }

  // Méthode pour supprimer une location
  deleteLocation(locationId: number): Observable<any> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.http.delete(url);
  }
}
