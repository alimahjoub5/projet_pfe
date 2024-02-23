import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentType } from '../classes/equipmentTypeID';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {
  private apiUrl = 'http://localhost:3000/'; // Remplacez ceci par votre URL d'API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les types d'équipement depuis l'API
  getAllEquipmentTypes(): Observable<EquipmentType[]> {
    return this.http.get<EquipmentType[]>(`${this.apiUrl}1`);
  }

  // Méthode pour récupérer un type d'équipement spécifique par son ID depuis l'API
  getEquipmentTypeById(id: number): Observable<EquipmentType> {
    return this.http.get<EquipmentType>(`${this.apiUrl}/equipmentTypes/${id}`);
  }

  // Méthode pour créer un nouveau type d'équipement via l'API
  createEquipmentType(equipmentType: EquipmentType): Observable<EquipmentType> {
    return this.http.post<EquipmentType>(`${this.apiUrl}/equipmentTypes`, equipmentType);
  }

  // Méthode pour mettre à jour un type d'équipement existant via l'API
  updateEquipmentType(equipmentType: EquipmentType): Observable<EquipmentType> {
    return this.http.put<EquipmentType>(`${this.apiUrl}/equipmentTypes/${equipmentType.EquipmentTypeID}`, equipmentType);
  }

  // Méthode pour supprimer un type d'équipement existant via l'API
  deleteEquipmentType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/equipmentTypes/${id}`);
  }
}
