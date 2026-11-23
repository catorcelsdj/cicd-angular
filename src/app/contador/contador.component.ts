import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  template: `
    <section class="contador">
      <h2>Contador</h2>
      <button class="menos" (click)="decrementar()" [disabled]="valor === 0">-</button>
      <span class="valor">{{ valor }}</span>
      <button class="mas" (click)="incrementar()">+</button>
      <button class="reset" (click)="reiniciar()">Reiniciar</button>
    </section>
  `
})
export class ContadorComponent {
  valor = 0;

  incrementar(): void {
    this.valor++;
  }

  decrementar(): void {
    if (this.valor > 0) {
      this.valor--;
    }
  }

  reiniciar(): void {
    this.valor = 0;
  }
}
