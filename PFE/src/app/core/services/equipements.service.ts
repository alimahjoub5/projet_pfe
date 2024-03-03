import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentType } from '../models/equipement';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {

  private apiUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer tous les types d'équipement
  getAllEquipmentTypes(): Observable<EquipmentType[]> {
    return this.http.get<EquipmentType[]>(`${this.apiUrl}/equipment-types`);
  }

  // Récupérer un type d'équipement par son ID
  getEquipmentTypeById(id: number): Observable<EquipmentType> {
    return this.http.get<EquipmentType>(`${this.apiUrl}/equipment-types/${id}`);
  }

  // Ajouter un nouveau type d'équipement
  addEquipmentType(equipmentType: EquipmentType): Observable<EquipmentType> {
    return this.http.post<EquipmentType>(`${this.apiUrl}/equipment-types`, equipmentType);
  }

  // Mettre à jour un type d'équipement existant
  updateEquipmentType(id: number, equipmentType: EquipmentType): Observable<EquipmentType> {
    return this.http.put<EquipmentType>(`${this.apiUrl}/equipment-types/${id}`, equipmentType);
  }

  // Supprimer un type d'équipement
  deleteEquipmentType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/equipment-types/${id}`);
  }

  getEquipmentName(equipmentTypeId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/equipment/${equipmentTypeId}/name`);
  }
}
