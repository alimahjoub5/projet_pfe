import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDataService } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api/login'; // Remplacez ceci par l'URL de votre API d'authentification

  constructor(private http: HttpClient,private authData: AuthDataService) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials)
      .pipe(
        tap(response => {
          // Stockage des données avec horodatage
          const now = Date.now();
    localStorage.setItem('Token', response.token);
    localStorage.setItem('UserID', response.UserID);
    localStorage.setItem('Username', response.User);
    localStorage.setItem('Role', response.Role);
    localStorage.setItem('timestamp', now.toString());
        })
      );
  }

 // Méthode pour vérifier si l'utilisateur est authentifié
 isAuthenticated(): boolean {
  // Vérifiez si toutes les informations d'authentification nécessaires sont présentes
  return !!(
    this.authData.Token &&
    this.authData.UserID &&
    this.authData.Username &&
    this.authData.Role
  );
}

  // Méthode pour récupérer les informations d'authentification stockées et vérifier l'expiration
  getAuthData(): any {
    const token = localStorage.getItem('Token');
    const userID = localStorage.getItem('UserID');
    const username = localStorage.getItem('Username');
    const role = localStorage.getItem('Role');
    const timestamp = localStorage.getItem('timestamp');

    if (token && userID && username && role && timestamp) {
      const expirationTime = 24 * 60 * 60 * 1000; // 1 jour en millisecondes
      const currentTime = Date.now();
      if (currentTime - parseInt(timestamp, 10) <= expirationTime) {
        return { token, userID, username, role };
      } else {
        this.clearAuthData();
        return null;
      }
    } else {
      return null;
    }
  }

  // Méthode pour effacer les données d'authentification
  clearAuthData(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('Username');
    localStorage.removeItem('Role');
    localStorage.removeItem('timestamp');
  } 

  isLoggedIn(): boolean {
    // Vérifier si le jeton d'authentification est présent dans le stockage local
    const token = localStorage.getItem('Token');
    return !!token;
  }

  
  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  getUserID(): string | null {
    return localStorage.getItem('UserID');
  }

  getUsername(): string | null {
    return localStorage.getItem('Username');
  }

  getRole(): string | null {
    return localStorage.getItem('Role');
  }

  getTimestamp(): string | null {
    return localStorage.getItem('timestamp');
  }


  includeAuthToken() {
    const token = localStorage.getItem('Token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      return { headers };
    } else {
      return {};
    }
  }
}
