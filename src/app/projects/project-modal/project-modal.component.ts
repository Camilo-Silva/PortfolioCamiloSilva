import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  @Input() project: Project | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  currentImageIndex = 0;

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.closeModal.emit();
    this.currentImageIndex = 0;
  }

  previousImage(): void {
    if (this.project && this.project.imagenes.length > 1) {
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
    this.currentImageIndex = index;
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
      this.nextImage();
    }
  }
}
