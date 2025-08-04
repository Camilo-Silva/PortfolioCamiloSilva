import { Component, Input, Output, EventEmitter, HostListener, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() project: Project | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  currentImageIndex = 0;
  private autoPlayInterval: any;
  private readonly autoPlayDelay = 4000; // 4 segundos entre imágenes
  private isAutoPlayDisabled = false; // Para deshabilitar cuando el usuario interactúa

  ngOnInit(): void {
    // El auto-play se iniciará cuando se abra el modal
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Inicia el auto-play del carrusel
  private startAutoPlay(): void {
    if (this.project && this.project.imagenes.length > 1 && !this.isAutoPlayDisabled) {
      this.autoPlayInterval = setInterval(() => {
        this.nextImage();
      }, this.autoPlayDelay);
    }
  }

  // Detiene el auto-play del carrusel
  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // Deshabilita el auto-play permanentemente cuando el usuario interactúa
  private disableAutoPlay(): void {
    this.isAutoPlayDisabled = true;
    this.stopAutoPlay();
  }

  // Método para manejar cuando el modal se abre/cierra
  ngOnChanges(): void {
    if (this.isOpen && this.project && this.project.imagenes.length > 1) {
      // Iniciar auto-play cuando se abre el modal
      setTimeout(() => this.startAutoPlay(), 1000); // Esperar 1 segundo antes de iniciar
    } else {
      // Detener auto-play cuando se cierra el modal
      this.stopAutoPlay();
    }
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.stopAutoPlay();
    this.closeModal.emit();
    this.currentImageIndex = 0;
    this.isAutoPlayDisabled = false; // Resetear estado para la próxima apertura
  }

  previousImage(): void {
    if (this.project && this.project.imagenes.length > 1) {
      // Deshabilitar auto-play cuando el usuario navega manualmente
      this.disableAutoPlay();
      this.currentImageIndex = 
        this.currentImageIndex === 0 
          ? this.project.imagenes.length - 1 
          : this.currentImageIndex - 1;
    }
  }

  nextImage(): void {
    if (this.project && this.project.imagenes.length > 1) {
      this.currentImageIndex = 
        this.currentImageIndex === this.project.imagenes.length - 1 
          ? 0 
          : this.currentImageIndex + 1;
    }
  }

  goToImage(index: number): void {
    // Deshabilitar auto-play cuando el usuario selecciona una imagen específica
    this.disableAutoPlay();
    this.currentImageIndex = index;
  }

  // Método para formatear el contenido del flujo como HTML
  getFormattedFlowContent(): string {
    if (!this.project?.flujoApp) {
      return '';
    }

    // Convertir markdown básico a HTML
    let htmlContent = this.project.flujoApp
      // Títulos h2
      .replace(/## (.*)/g, '<h2>$1</h2>')
      // Títulos h3
      .replace(/### (.*)/g, '<h3>$1</h3>')
      // Texto en negrita
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Separador horizontal
      .replace(/---/g, '<hr>')
      // Items de lista con checkmark
      .replace(/- ✅ \*\*(.*?)\*\*: (.*)/g, '<li class="check-item"><strong>$1</strong>: $2</li>')
      // Items de lista normales
      .replace(/- (.*)/g, '<li>$1</li>')
      // Números de lista
      .replace(/(\d+)\. (.*)/g, '<li class="numbered">$2</li>')
      // Saltos de línea dobles para párrafos
      .replace(/\n\n/g, '</p><p>')
      // Saltos de línea simples para <br>
      .replace(/\n/g, '<br>');

    // Envolver en párrafos si no hay etiquetas de bloque
    if (!htmlContent.includes('<h2>') && !htmlContent.includes('<h3>')) {
      htmlContent = '<p>' + htmlContent + '</p>';
    }

    return htmlContent;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.onClose();
    }
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  onArrowLeft(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.previousImage();
    }
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  onArrowRight(event: KeyboardEvent): void {
    if (this.isOpen) {
      // Deshabilitar auto-play cuando se navega con teclado
      this.disableAutoPlay();
      this.nextImage();
    }
  }

}
