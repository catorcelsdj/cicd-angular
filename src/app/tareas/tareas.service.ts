import { Injectable } from '@angular/core';

export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private tareas: Tarea[] = [];
  private siguienteId = 1;

  listar(): Tarea[] {
    return [...this.tareas];
  }

  anadir(titulo: string): Tarea | null {
    const limpio = titulo.trim();
    if (!limpio) {
      return null;
    }
    const tarea: Tarea = { id: this.siguienteId++, titulo: limpio, completada: false };
    this.tareas.push(tarea);
    return tarea;
  }

  alternar(id: number): void {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
    }
  }

  eliminar(id: number): boolean {
    const antes = this.tareas.length;
    this.tareas = this.tareas.filter(t => t.id !== id);
    return this.tareas.length < antes;
  }

  pendientes(): number {
    return this.tareas.filter(t => !t.completada).length;
  }
}
