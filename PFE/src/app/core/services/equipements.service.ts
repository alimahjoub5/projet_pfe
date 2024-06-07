import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentType } from '../models/equipement';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {

  private apiUrl = 'http://localhost:8000/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupérer tous les types d'équipement
  getAllEquipmentTypes(): Observable<EquipmentType[]> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<EquipmentType[]>(`${this.apiUrl}/equipment-types`, headers);
  }

  // Récupérer un type d'équipement par son ID
  getEquipmentTypeById(id: number): Observable<EquipmentType> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<EquipmentType>(`${this.apiUrl}/equipment-types/${id}`, headers);
  }

  // Ajouter un nouveau type d'équipement
  addEquipmentType(equipmentType: EquipmentType): Observable<EquipmentType> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<EquipmentType>(`${this.apiUrl}/equipment-types`, equipmentType, headers);
  }

  // Mettre à jour un type d'équipement existant
  updateEquipmentType(id: number, equipmentType: EquipmentType): Observable<EquipmentType> {
    const headers = this.authService.includeAuthToken();
    return this.http.put<EquipmentType>(`${this.apiUrl}/equipment-types/${id}`, equipmentType, headers);
  }

  // Supprimer un type d'équipement
  deleteEquipmentType(id: number): Observable<void> {
    const headers = this.authService.includeAuthToken();
    return this.http.delete<void>(`${this.apiUrl}/equipment-types/${id}`, headers);
  }

  getEquipmentName(equipmentTypeId: number): Observable<string> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<string>(`${this.apiUrl}/equipment/${equipmentTypeId}/name`, headers);
  }



  //----------------------------------STATISTIQUE-----------------------------------------------------

  getAvailabilityRate(equipmentTypeId: number, startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('equipment_type_id', equipmentTypeId.toString())
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get<any>(`${this.apiUrl}/equipment/availability`, { params });
  }
}
