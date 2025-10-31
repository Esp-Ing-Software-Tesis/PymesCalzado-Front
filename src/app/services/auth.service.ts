import { Injectable } from '@angular/core';
import { AuthResponse, Auth } from '../models/auth.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userRole = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRole.asObservable();

  private readonly username = new BehaviorSubject<string | null>(null);
  username$ = this.username.asObservable();

  private readonly userProductionLine = new BehaviorSubject<string | null>(null);
  userProductionLine$ = this.userProductionLine.asObservable();

  private readonly sessionId = new BehaviorSubject<string | null>(null);
  sessionId$ = this.sessionId.asObservable();

  private readonly token = new BehaviorSubject<string | null>(null);
  token$ = this.token.asObservable();

  private readonly userId = new BehaviorSubject<string | null>(null);
  userId$ = this.userId.asObservable();


  private readonly apiUrl = 'https://1mhslg7415.execute-api.us-east-1.amazonaws.com/production/api/v1';

  constructor(
    private readonly http: HttpClient
  ) {
    const storedRole = sessionStorage.getItem('role');
    const storedUsername = sessionStorage.getItem('username');
    const storedProductionLine = sessionStorage.getItem('productionLine');
    const storedSessionId = sessionStorage.getItem('sessionId');
    const storedToken = sessionStorage.getItem('token');
    const storedUserId = sessionStorage.getItem('userId');

    if (storedRole) {
      this.userRole.next(storedRole);
    }
    if (storedUsername) {
      this.username.next(storedUsername);
    }
    if (storedProductionLine) {
      this.userProductionLine.next(storedProductionLine);
    }
    if (storedSessionId) {
      this.sessionId.next(storedSessionId);
    }
    if (storedToken) {
      this.token.next(storedToken);
    }
    if (storedUserId) {
      this.userId.next(storedUserId);
    }
  }

  // Ejecucion del EP
  getAccessToken(consultToken: Auth): Observable<AuthResponse> {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    const  Headers = new HttpHeaders({
      'x-session-id': `SFA-${randomNumber}`
    });
    return this.http.post<AuthResponse>(this.apiUrl + '/auth/login', consultToken, { headers: Headers });
  }

  // Servicios para guardar en el sesion storage
  setRole(role: string) {
    sessionStorage.setItem('role', role);
    this.userRole.next(role);
  }

  setUsername(username: string) {
    sessionStorage.setItem('username', username);
    this.username.next(username);
  }

  setUserProductionLine(productionLine: string | null) {
    sessionStorage.setItem('productionLine', productionLine || '');
    this.userProductionLine.next(productionLine);
  }

  setSessionId(sessionId: string) {
    sessionStorage.setItem('sessionId', sessionId);
    this.sessionId.next(sessionId);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
    this.token.next(token);
  }

  setUserId(userId: string) {
    sessionStorage.setItem('userId', userId);
    this.userId.next(userId);
  }

  clearAll() {
    localStorage.clear();
    sessionStorage.clear();
    this.userRole.next(null);
    this.username.next(null);
    this.userProductionLine.next(null);
    this.sessionId.next(null);
    this.token.next(null);
    this.userId.next(null);
  }
}
