import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userRole = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRole.asObservable();

  private username = new BehaviorSubject<string | null>(null);
  username$ = this.username.asObservable();

  private userProductionLine = new BehaviorSubject<string | null>(null);
  userProductionLine$ = this.userProductionLine.asObservable();

  private userState = new BehaviorSubject<string | null>(null);
  userState$ = this.userState.asObservable();

  constructor() {
    const storedRole = sessionStorage.getItem('role');
    const storedUsername = sessionStorage.getItem('username');
    const storedProductionLine = sessionStorage.getItem('userProductionLine');
    if (storedRole) {
      this.userRole.next(storedRole);
    }
    if (storedUsername) {
      this.username.next(storedUsername);
    }
    if (storedProductionLine) {
      this.userProductionLine.next(storedProductionLine);
    }
  }

  setRole(role: string) {
    sessionStorage.setItem('role', role);
    this.userRole.next(role);
  }

  setUsername(username: string) {
    sessionStorage.setItem('username', username);
    this.username.next(username);
  }

  setUserProductionLine(productionLine: string | null) {
    sessionStorage.setItem('userProductionLine', productionLine || '');
    this.userProductionLine.next(productionLine);
  }

  clearAll() {
    localStorage.clear();
    sessionStorage.clear();
    this.userRole.next(null);
    this.username.next(null);
    this.userProductionLine.next(null);
    this.userState.next(null);
  }
}
