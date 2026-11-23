import { TestBed } from '@angular/core/testing';
import { TareasService } from './tareas.service';

describe('TareasService', () => {
  let service: TareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasService);
  });

  it('empieza sin tareas', () => {
    expect(service.listar()).toEqual([]);
    expect(service.pendientes()).toBe(0);
  });

  it('añade una tarea quitando espacios y le asigna id', () => {
    const tarea = service.anadir('  Estudiar CI/CD  ');
    expect(tarea).toEqual({ id: 1, titulo: 'Estudiar CI/CD', completada: false });
    expect(service.listar().length).toBe(1);
  });

  it('no añade tareas vacías', () => {
    expect(service.anadir('   ')).toBeNull();
    expect(service.listar().length).toBe(0);
  });

  it('asigna ids consecutivos', () => {
    const a = service.anadir('A');
    const b = service.anadir('B');
    expect(a?.id).toBe(1);
    expect(b?.id).toBe(2);
  });

  it('alterna el estado de una tarea y actualiza las pendientes', () => {
    const t = service.anadir('Tarea')!;
    service.alternar(t.id);
    expect(service.listar()[0].completada).toBe(true);
    expect(service.pendientes()).toBe(0);
    service.alternar(t.id);
    expect(service.listar()[0].completada).toBe(false);
  });

  it('alternar un id inexistente no cambia nada', () => {
    service.anadir('Tarea');
    service.alternar(99);
    expect(service.listar()[0].completada).toBe(false);
  });

  it('elimina una tarea existente y devuelve true', () => {
    const t = service.anadir('Borrar')!;
    expect(service.eliminar(t.id)).toBe(true);
    expect(service.listar()).toEqual([]);
  });

  it('devuelve false al eliminar un id inexistente', () => {
    service.anadir('Tarea');
    expect(service.eliminar(42)).toBe(false);
    expect(service.listar().length).toBe(1);
  });

  it('listar devuelve una copia (no expone el array interno)', () => {
    service.anadir('Tarea');
    service.listar().pop();
    expect(service.listar().length).toBe(1);
  });
});
