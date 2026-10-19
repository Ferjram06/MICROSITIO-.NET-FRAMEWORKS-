import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-explorador',
  imports: [RouterLink,IonButton],
  templateUrl: './explorador.html',
  styleUrl: './explorador.css',
})
export class Explorador {}