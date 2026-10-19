
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampusApi } from '../../services/campus-api';

@Component({
  selector: 'app-recursos',
  imports: [AsyncPipe],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class Recursos {
  private readonly api = inject(CampusApi);

  readonly recursos$ = this.api.obtenerRecursos();
}
