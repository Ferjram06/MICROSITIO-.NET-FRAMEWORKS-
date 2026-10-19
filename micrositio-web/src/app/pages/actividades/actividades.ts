
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CampusApi } from '../../services/campus-api';
import {
  Subject,
  catchError,
  map,
  of,
  startWith,
  switchMap
} from 'rxjs';

@Component({
  selector: 'app-actividades',
  imports: [AsyncPipe],
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades {
  private readonly api = inject(CampusApi);
  private readonly recargar$ = new Subject<void>();

  readonly estado$ = this.recargar$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.api.obtenerActividades().pipe(
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

  reintentar(): void {
    this.recargar$.next();
  }
}
