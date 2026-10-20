
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

export type NuevoRecurso = Omit<Recurso, 'id'>;

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

  obtenerRecursos(busqueda = ''): Observable<Recurso[]> {
    const url = `${this.baseUrl}/recursos`;
    const parametros = busqueda.trim()
      ? `?busqueda=${encodeURIComponent(busqueda.trim())}`
      : '';

    return this.http.get<Recurso[]>(`${url}${parametros}`);
  }

  obtenerActividades(busqueda = ''): Observable<Actividad[]> {
    const url = `${this.baseUrl}/actividades`;
    const parametros = busqueda.trim()
      ? `?busqueda=${encodeURIComponent(busqueda.trim())}`
      : '';

    return this.http.get<Actividad[]>(`${url}${parametros}`);
  }

  crearRecurso(recurso: NuevoRecurso): Observable<Recurso> {
    return this.http.post<Recurso>(
      `${this.baseUrl}/recursos`,
      recurso
    );
  }

  actualizarRecurso(
    id: number,
    recurso: NuevoRecurso
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/recursos/${id}`,
      recurso
    );
  }

  eliminarRecurso(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/recursos/${id}`
    );
  }
}
