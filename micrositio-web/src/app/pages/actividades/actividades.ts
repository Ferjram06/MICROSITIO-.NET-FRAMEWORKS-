
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CampusApi } from '../../services/campus-api';

@Component({
  selector: 'app-actividades',
  imports: [AsyncPipe],
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades {
  private readonly api = inject(CampusApi);

  readonly actividades$ = this.api.obtenerActividades();
}
