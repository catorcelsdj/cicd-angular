import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';
import { ContadorComponent } from './contador/contador.component';

@Component({
  imports: [RouterOutlet, TareasComponent, ContadorComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('cicd-angular');
    demo: number = variableQueNoExiste;
}