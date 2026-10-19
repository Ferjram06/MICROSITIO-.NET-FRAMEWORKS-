
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
  selector: 'app-recursos',
  imports: [AsyncPipe],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class Recursos {
  private readonly api = inject(CampusApi);
  private readonly recargar$ = new Subject<void>();

  readonly estado$ = this.recargar$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.api.obtenerRecursos().pipe(
        map(recursos => ({
          status: 'success' as const,
          recursos
        })),
        catchError(() =>
          of({
            status: 'error' as const,
            mensaje: 'No pudimos cargar los recursos. Comprueba tu conexión e inténtalo de nuevo.'
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
