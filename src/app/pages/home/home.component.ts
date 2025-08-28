import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typewriterContainer') typewriterContainer: ElementRef | undefined;
  private fullText = 'CAMILO SILVA';
  private typeSpeed = 50; // milisegundos entre caracteres
  private typingTimeout: any = null;
  private cursorIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Solo ejecutar en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
      // Pequeño retraso antes de iniciar el efecto para asegurar que la vista está renderizada
      setTimeout(() => {
        this.startTypewriterEffect();
      }, 500);
    }
  }

  ngOnDestroy() {
    // Limpieza de timeouts al destruir el componente
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  startTypewriterEffect() {
    if (!this.typewriterContainer) return;
    
    const container = this.typewriterContainer.nativeElement;
    this.cursorIndex = 0;
    container.textContent = '';
    
    // Comenzar el efecto de tipeo
    this.typeNextCharacter(container);
  }

  typeNextCharacter(container: HTMLElement) {
    if (this.cursorIndex < this.fullText.length) {
      // Agregar el siguiente carácter
      container.textContent += this.fullText[this.cursorIndex];
      this.cursorIndex++;
      
      // Determinar el retardo para el siguiente carácter
      let nextDelay = this.typeSpeed;
      
      // Añadir variación natural en la velocidad de tipeo
      nextDelay += Math.random() * 15 - 10;
      
      // Ocasionalmente añadir una pausa más larga (como si estuviera pensando)
      if (Math.random() > 0.95) {
        nextDelay += 200;
      }
      
      // Pausa ligeramente más larga después de cada espacio
      if (this.fullText[this.cursorIndex - 1] === ' ') {
        nextDelay += 10;
      }
      
      this.typingTimeout = setTimeout(() => {
        this.typeNextCharacter(container);
      }, nextDelay);
    }
  }
}
