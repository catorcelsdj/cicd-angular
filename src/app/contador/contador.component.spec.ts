import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContadorComponent } from './contador.component';

describe('ContadorComponent', () => {
  let fixture: ComponentFixture<ContadorComponent>;
  let component: ContadorComponent;
  let el: HTMLElement;

  const valorPintado = () => el.querySelector('.valor')!.textContent!.trim();
  const pulsar = (selector: string) => {
    el.querySelector<HTMLButtonElement>(selector)!.click();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContadorComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContadorComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('empieza en 0 con el botón "-" desactivado', () => {
    expect(valorPintado()).toBe('0');
    expect(el.querySelector<HTMLButtonElement>('.menos')!.disabled).toBe(true);
  });

  it('incrementa al pulsar "+"', () => {
    pulsar('.mas');
    pulsar('.mas');
    expect(valorPintado()).toBe('2');
  });

  it('decrementa al pulsar "-"', () => {
    pulsar('.mas');
    pulsar('.menos');
    expect(valorPintado()).toBe('0');
  });

  it('nunca baja de 0', () => {
    component.decrementar();
    fixture.detectChanges();
    expect(component.valor).toBe(0);
  });

  it('reinicia a 0', () => {
    pulsar('.mas');
    pulsar('.mas');
    pulsar('.reset');
    expect(valorPintado()).toBe('0');
  });
});
