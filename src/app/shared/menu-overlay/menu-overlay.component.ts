import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.scss'
})
export class MenuOverlayComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  onBackdropClick(event: Event): void {
    // Solo cerrar si el click es en el backdrop, no en el contenido del menú
    if (event.target === event.currentTarget) {
      this.closeMenu.emit();
    }
  }

  onMenuItemClick(): void {
    this.closeMenu.emit();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.closeMenu.emit();
    }
  }
}
