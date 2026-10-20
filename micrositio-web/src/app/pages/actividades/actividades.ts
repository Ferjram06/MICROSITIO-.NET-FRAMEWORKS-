import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampusApi } from '../../services/campus-api';
import {
  Subject,
  catchError,
  debounceTime,
  map,
  merge,
  of,
  startWith,
  switchMap
} from 'rxjs';

@Component({
  selector: 'app-actividades',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades {
  private readonly api = inject(CampusApi);
  private readonly busqueda$ = new Subject<string>();
  private readonly recargar$ = new Subject<void>();

  busqueda = '';

  readonly estado$ = merge(
    this.busqueda$.pipe(
      startWith(''),
      debounceTime(250)
    ),
    this.recargar$.pipe(
      map(() => this.busqueda)
    )
  ).pipe(
    switchMap(busqueda =>
      this.api.obtenerActividades(busqueda).pipe(
        map(actividades => ({
          status: 'success' as const,
          actividades
        })),
        catchError(() =>
          of({
            status: 'error' as const,
            mensaje: 'No pudimos cargar las actividades. Comprueba tu conexión e inténtalo de nuevo.'
          })
        ),
        startWith({
          status: 'loading' as const
        })
      )
    )
  );

  buscar(valor: string): void {
    this.busqueda = valor;
    this.busqueda$.next(valor);
  }

  reintentar(): void {
    this.recargar$.next();
  }
}
