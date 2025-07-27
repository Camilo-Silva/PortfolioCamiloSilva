import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-toggle',
  standalone: true,
  imports: [],
  templateUrl: './navbar-toggle.component.html',
  styleUrl: './navbar-toggle.component.scss'
})
export class NavbarToggleComponent {
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<void>();

  onToggle(): void {
    this.menuToggle.emit();
  }
}
