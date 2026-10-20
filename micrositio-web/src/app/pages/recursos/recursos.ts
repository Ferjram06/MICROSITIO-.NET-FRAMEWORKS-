
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampusApi, NuevoRecurso, Recurso } from '../../services/campus-api';
import {
  Observable,
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
  selector: 'app-recursos',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class Recursos {
  private readonly api = inject(CampusApi);
  private readonly busqueda$ = new Subject<string>();
  private readonly recargar$ = new Subject<void>();

  busqueda = '';
  formularioVisible = false;
  guardando = false;
  mensajeAccion = '';
  recursoEditandoId: number | null = null;

  nuevoRecurso: NuevoRecurso = this.crearFormularioVacio();

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
      this.api.obtenerRecursos(busqueda).pipe(
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

  buscar(valor: string): void {
    this.busqueda = valor;
    this.busqueda$.next(valor);
  }

  reintentar(): void {
    this.recargar$.next();
  }

  abrirFormulario(): void {
    this.recursoEditandoId = null;
    this.nuevoRecurso = this.crearFormularioVacio();
    this.mensajeAccion = '';
    this.formularioVisible = true;
  }

  editar(recurso: Recurso): void {
    this.recursoEditandoId = recurso.id;
    this.nuevoRecurso = {
      titulo: recurso.titulo,
      categoria: recurso.categoria,
      descripcion: recurso.descripcion,
      url: recurso.url
    };
    this.mensajeAccion = '';
    this.formularioVisible = true;
  }

  cancelarFormulario(): void {
    this.formularioVisible = false;
    this.recursoEditandoId = null;
    this.nuevoRecurso = this.crearFormularioVacio();
    this.mensajeAccion = '';
  }

  guardarRecurso(): void {
    if (this.guardando) return;

    this.guardando = true;
    this.mensajeAccion = '';

    const solicitud: Observable<unknown> =
      this.recursoEditandoId === null
      ? this.api.crearRecurso(this.nuevoRecurso)
      : this.api.actualizarRecurso(
          this.recursoEditandoId,
          this.nuevoRecurso
        );

    solicitud.subscribe({
      next: () => {
        this.guardando = false;
        this.cancelarFormulario();
        this.recargar$.next();
      },
      error: () => {
        this.guardando = false;
        this.mensajeAccion =
          'No se pudo guardar el recurso. Comprueba los datos e inténtalo de nuevo.';
      }
    });
  }

  eliminar(recurso: Recurso): void {
    const confirmado = window.confirm(
      `¿Deseas eliminar "${recurso.titulo}"?`
    );

    if (!confirmado) return;

    this.mensajeAccion = '';

    this.api.eliminarRecurso(recurso.id).subscribe({
      next: () => this.recargar$.next(),
      error: () => {
        this.mensajeAccion =
          'No se pudo eliminar el recurso. Inténtalo de nuevo.';
      }
    });
  }

  private crearFormularioVacio(): NuevoRecurso {
    return {
      titulo: '',
      categoria: '',
      descripcion: '',
      url: ''
    };
  }
}
