import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getToken(): string {
    // Retrieve the token from storage or any other mechanism
    return localStorage.getItem('token') || '';
  }
}
