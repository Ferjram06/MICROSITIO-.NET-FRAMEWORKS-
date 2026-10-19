import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactPanel } from '../../react-widget/react-panel';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink,ReactPanel],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}