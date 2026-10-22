
import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly document = inject(DOCUMENT);

  modoOscuro = false;

  cambiarTema(): void {
    this.modoOscuro = !this.modoOscuro;

    const tema = this.modoOscuro ? 'dark' : 'light';

    this.document.documentElement.setAttribute('data-theme', tema);
  }
}
