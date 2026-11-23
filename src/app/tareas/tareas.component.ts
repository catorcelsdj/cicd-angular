import { Component, inject } from '@angular/core';
import { TareasService, Tarea } from './tareas.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  template: `
    <section class="tareas">
      <h2>Mis tareas</h2>
      <input #nueva type="text" placeholder="Nueva tarea" class="nueva" />
      <button class="anadir" (click)="anadir(nueva.value); nueva.value = ''">Añadir</button>

      @if (tareas.length === 0) {
        <p class="vacio">No hay tareas</p>
      } @else {
        <ul>
          @for (t of tareas; track t.id) {
            <li [class.hecha]="t.completada">
              <input type="checkbox" [checked]="t.completada" (change)="alternar(t)" />
              <span>{{ t.titulo }}</span>
              <button class="eliminar" (click)="eliminar(t)">✕</button>
            </li>
          }
        </ul>
      }
      <p class="pendientes">Pendientes: {{ pendientes }}</p>
    </section>
  `,
  styles: [`.hecha span { text-decoration: line-through; }`]
})
export class TareasComponent {
  private servicio = inject(TareasService);
  tareas: Tarea[] = this.servicio.listar();
  pendientes = this.servicio.pendientes();

  anadir(titulo: string): void {
    this.servicio.anadir(titulo);
    this.refrescar();
  }

  alternar(t: Tarea): void {
    this.servicio.alternar(t.id);
    this.refrescar();
  }

  eliminar(t: Tarea): void {
    this.servicio.eliminar(t.id);
    this.refrescar();
  }

  private refrescar(): void {
    this.tareas = this.servicio.listar();
    this.pendientes = this.servicio.pendientes();
  }
}
