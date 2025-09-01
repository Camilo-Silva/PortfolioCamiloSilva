import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, HostListener, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements AfterViewInit, OnDestroy {
  @Input() projects: Project[] = [];
  @Output() projectHover = new EventEmitter<Project | null>();
  @Output() projectClick = new EventEmitter<Project>();

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  currentIndex = 0;
  itemsPerView = 3; // Número de cards visibles por defecto
  
  // Variables para el manejo de touch events
  private touchStartX = 0;
  private touchEndX = 0;
  private touchStartY = 0;
  private touchEndY = 0;
  private minSwipeDistance = 50; // Distancia mínima para considerar un swipe
  private touchStartHandler?: (e: TouchEvent) => void;
  private touchEndHandler?: (e: TouchEvent) => void;
  private touchMoveHandler?: (e: TouchEvent) => void;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateItemsPerView();
      this.updateCarouselPosition();
    }
  }
  
  get maxIndex(): number {
    return Math.max(0, this.projects.length - this.itemsPerView);
  }

  get canScrollLeft(): boolean {
    return this.currentIndex > 0;
  }

  get canScrollRight(): boolean {
    return this.currentIndex < this.maxIndex;
  }

  private getCardWidth(): number {
    // Verificar si estamos en el navegador antes de acceder a window
    if (!isPlatformBrowser(this.platformId)) {
      // Valor por defecto para SSR (desktop)
      return 320;
    }
    
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 480) {
      // Móvil pequeño: 240px card + 12px gap
      return 252;
    } else if (windowWidth <= 768) {
      // Tablet: 260px card + 16px gap
      return 276;
    } else {
      // Desktop: 300px card + 20px gap
      return 320;
    }
  }

  private updateItemsPerView(): void {
    // Verificar si estamos en el navegador antes de acceder a window
    if (!isPlatformBrowser(this.platformId)) {
      // Valor por defecto para SSR (desktop)
      this.itemsPerView = 3;
      return;
    }
    
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 480) {
      this.itemsPerView = 1; // Móvil: 1 card visible
    } else if (windowWidth <= 768) {
      this.itemsPerView = 2; // Tablet: 2 cards visibles
    } else {
      this.itemsPerView = 3; // Desktop: 3 cards visibles
    }
    
    // Ajustar currentIndex si está fuera del rango válido
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }
  }

  ngAfterViewInit(): void {
    // Inicializar la posición del carrusel después de que la vista esté lista
    if (isPlatformBrowser(this.platformId)) {
      this.updateItemsPerView();
      setTimeout(() => {
        this.updateCarouselPosition();
      }, 0);
      
      // Agregar event listeners para touch events
      this.setupTouchEvents();
    }
  }

  private setupTouchEvents(): void {
    if (this.carousel && this.carousel.nativeElement) {
      const carouselElement = this.carousel.nativeElement;
      
      // Crear las funciones handler para poder removerlas después
      this.touchStartHandler = (e: TouchEvent) => this.onTouchStart(e);
      this.touchMoveHandler = (e: TouchEvent) => this.onTouchMove(e);
      this.touchEndHandler = (e: TouchEvent) => this.onTouchEnd(e);
      
      carouselElement.addEventListener('touchstart', this.touchStartHandler, { passive: true });
      carouselElement.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
      carouselElement.addEventListener('touchend', this.touchEndHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    // Limpiar event listeners
    if (this.carousel && this.carousel.nativeElement) {
      const carouselElement = this.carousel.nativeElement;
      
      if (this.touchStartHandler) {
        carouselElement.removeEventListener('touchstart', this.touchStartHandler);
      }
      if (this.touchMoveHandler) {
        carouselElement.removeEventListener('touchmove', this.touchMoveHandler);
      }
      if (this.touchEndHandler) {
        carouselElement.removeEventListener('touchend', this.touchEndHandler);
      }
    }
  }

  private onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  private onTouchMove(event: TouchEvent): void {
    // Obtener la posición actual del touch
    const currentX = event.changedTouches[0].screenX;
    const currentY = event.changedTouches[0].screenY;
    
    // Calcular la diferencia desde el inicio
    const diffX = Math.abs(currentX - this.touchStartX);
    const diffY = Math.abs(currentY - this.touchStartY);
    
    // Si el movimiento es más horizontal que vertical, prevenir scroll vertical
    if (diffX > diffY && diffX > 10) {
      event.preventDefault();
    }
  }

  private onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeDistanceX = this.touchStartX - this.touchEndX;
    const swipeDistanceY = this.touchStartY - this.touchEndY;
    
    // Solo procesar swipe si el movimiento horizontal es mayor que el vertical
    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
      // Swipe hacia la izquierda (siguiente)
      if (swipeDistanceX > this.minSwipeDistance && this.canScrollRight) {
        this.scrollRight();
      }
      // Swipe hacia la derecha (anterior)
      else if (swipeDistanceX < -this.minSwipeDistance && this.canScrollLeft) {
        this.scrollLeft();
      }
    }
  }

  onProjectHover(project: Project): void {
    this.projectHover.emit(project);
  }

  onProjectLeave(): void {
    this.projectHover.emit(null);
  }

  onProjectClick(project: Project): void {
    this.projectClick.emit(project);
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  scrollLeft(): void {
    if (this.canScrollLeft) {
      this.currentIndex--;
      this.updateCarouselPosition();
    }
  }

  scrollRight(): void {
    if (this.canScrollRight) {
      this.currentIndex++;
      this.updateCarouselPosition();
    }
  }

  updateCarouselPosition(): void {
    if (this.carousel) {
      const cardWidth = this.getCardWidth();
      const translateX = -this.currentIndex * cardWidth;
      const carouselTrack = this.carousel.nativeElement.querySelector('.carousel-track');
      if (carouselTrack) {
        carouselTrack.style.transform = `translateX(${translateX}px)`;
      }
    }
  }

  // Manejadores de eventos de teclado para accesibilidad
  onProjectKeyDown(event: KeyboardEvent, project: Project): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onProjectClick(project);
    }
  }

  onIndicatorKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.currentIndex = index;
      this.updateCarouselPosition();
    }
  }
}
