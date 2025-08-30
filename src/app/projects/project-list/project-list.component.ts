import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  get maxIndex(): number {
    return Math.max(0, this.projects.length - this.itemsPerView);
  }

  get canScrollLeft(): boolean {
    return this.currentIndex > 0;
  }

  get canScrollRight(): boolean {
    return this.currentIndex < this.maxIndex;
  }

  ngAfterViewInit(): void {
    // Inicializar la posición del carrusel después de que la vista esté lista
    setTimeout(() => {
      this.updateCarouselPosition();
    }, 0);
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
      const cardWidth = 320; // Ancho de cada card + gap
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
