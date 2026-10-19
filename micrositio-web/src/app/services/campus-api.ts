
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recurso {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  url: string;
}

export interface Actividad {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampusApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5064/api';

  obtenerRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.baseUrl}/recursos`);
  }

  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.baseUrl}/actividades`);
  }
}
