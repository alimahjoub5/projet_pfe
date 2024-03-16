import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  Token: string | null = null;
  UserID: string | null = null;
  Username: string | null = null;
  Role: string | null = null;
}
