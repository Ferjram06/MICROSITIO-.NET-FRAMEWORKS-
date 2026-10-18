import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Recursos } from './pages/recursos/recursos';
import { Actividades } from './pages/actividades/actividades';
import { Explorador } from './pages/explorador/explorador';
import { Acerca } from './pages/acerca/acerca';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'recursos', component: Recursos },
  { path: 'actividades', component: Actividades },
  { path: 'explorador', component: Explorador },
  { path: 'acerca', component: Acerca },
  { path: '**', redirectTo: 'inicio' }
];