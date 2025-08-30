import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements AfterViewInit {
  @Input() projects: Project[] = [];
  @Output() projectHover = new EventEmitter<Project | null>();
  @Output() projectClick = new EventEmitter<Project>();

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  currentIndex = 0;
  itemsPerView = 3; // Número de cards visibles por defecto
  
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
