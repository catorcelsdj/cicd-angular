import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasComponent } from './tareas.component';

describe('TareasComponent', () => {
  let fixture: ComponentFixture<TareasComponent>;
  let el: HTMLElement;

  function escribirYAnadir(texto: string): void {
    const input = el.querySelector<HTMLInputElement>('input.nueva')!;
    input.value = texto;
    el.querySelector<HTMLButtonElement>('button.anadir')!.click();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TareasComponent] }).compileComponents();
    fixture = TestBed.createComponent(TareasComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('muestra el mensaje de lista vacía al empezar', () => {
    expect(el.querySelector('.vacio')?.textContent).toContain('No hay tareas');
    expect(el.querySelectorAll('li').length).toBe(0);
  });

  it('añade una tarea al hacer clic y limpia el input', () => {
    escribirYAnadir('Configurar GitHub Pages');
    const items = el.querySelectorAll('li');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Configurar GitHub Pages');
    expect(el.querySelector<HTMLInputElement>('input.nueva')!.value).toBe('');
    expect(el.querySelector('.pendientes')?.textContent).toContain('1');
  });

  it('no añade nada si el texto está vacío', () => {
    escribirYAnadir('   ');
    expect(el.querySelectorAll('li').length).toBe(0);
  });

  it('marca la tarea como hecha al pulsar el checkbox', () => {
    escribirYAnadir('Tarea');
    const check = el.querySelector<HTMLInputElement>('li input[type=checkbox]')!;
    check.click();
    fixture.detectChanges();
    expect(el.querySelector('li')!.classList.contains('hecha')).toBe(true);
    expect(el.querySelector('.pendientes')?.textContent).toContain('0');
  });

  it('elimina la tarea al pulsar ✕', () => {
    escribirYAnadir('Tarea');
    el.querySelector<HTMLButtonElement>('button.eliminar')!.click();
    fixture.detectChanges();
    expect(el.querySelectorAll('li').length).toBe(0);
    expect(el.querySelector('.vacio')).not.toBeNull();
  });
});
