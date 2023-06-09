import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './models/User';
import { Car } from './models/Car';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, this.getFormData(user))
      .pipe(
        tap((response) => {
          if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Obtener un usuario por su ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, this.getFormData(user));
  }

  // Actualizar un usuario existente
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/users/${id}`,
      this.getFormUrlEncoded(user)
    );
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Obtener todos los carros
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }

  // Obtener un usuario por su ID
  getCar(id: number): Observable<Car> {
    const url = `${this.apiUrl}/cars/${id}`;
    return this.http.get<Car>(url);
  }

  // Crear un nuevo usuario
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/cars`, this.getFormData(car));
  }

  // Actualizar un usuario existente
  updateCar(id: number, car: Car): Observable<Car> {
    const url = `${this.apiUrl}/cars/${id}`;
    return this.http.put<Car>(url, this.getFormUrlEncoded(car));
  }

  // Eliminar un usuario
  deleteCar(id: number): Observable<Car> {
    const url = `${this.apiUrl}/cars/${id}`;
    return this.http.delete<Car>(url);
  }

  getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  getFormUrlEncoded(object: any): HttpParams {
    let params = new HttpParams();
    Object.keys(object).forEach((key) => {
      params = params.append(key, object[key]);
    });
    return params;
  }
}
