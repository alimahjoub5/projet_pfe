import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8000/api/chat';

  constructor(private http: HttpClient) { }

  sendMessage(messageData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sendMessage`, messageData)
      .pipe(
        catchError(error => {
          throw 'Error in sending message: ' + error;
        })
      );
  }

  getMessages(senderId: number, recipientId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getMessages/${senderId}/${recipientId}`)
      .pipe(
        catchError(error => {
          throw 'Error in getting messages: ' + error;
        })
      );
  }
}
