import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Task} from '../models/task';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8000/api';
 

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllTasks(): Observable<Task> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Task>(`${this.apiUrl}/ticket-tasks`, headers);
  }

  getTaskById(id: number): Observable<Task> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<Task>(`${this.apiUrl}/ticket-tasks/${id}`, headers);
  }

  addTask(task: Task): Observable<Task> {
    const headers = this.authService.includeAuthToken();
    return this.http.post<Task>(`${this.apiUrl}/ticket-tasks`, task, headers);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const headers = this.authService.includeAuthToken();
    return this.http.put<Task>(`${this.apiUrl}/ticket-tasks/${id}`, task, headers);
  }

  deleteTask(id: number): Observable<void> {
    const headers = this.authService.includeAuthToken();
    return this.http.delete<void>(`${this.apiUrl}/ticket-tasks/${id}`, headers);
  }

  getTaskName(taskId: number): Observable<string> {
    const headers = this.authService.includeAuthToken();
    return this.http.get<string>(`${this.apiUrl}/tasks/${taskId}/name`, headers);
  }
}
