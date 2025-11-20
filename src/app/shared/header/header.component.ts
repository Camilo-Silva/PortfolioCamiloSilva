import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LogoComponent } from '../logo/logo.component';
import { NavbarToggleComponent } from '../navbar-toggle/navbar-toggle.component';
import { MenuOverlayComponent } from '../menu-overlay/menu-overlay.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, NavbarToggleComponent, MenuOverlayComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkTheme = false;
  isMenuOpen = false;
  isTransitioning = false;

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.isDarkTheme = theme === 'dark';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(event: MouseEvent): void {
    if (this.isTransitioning) return;

    // Obtener las coordenadas del clic relativas al botón
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calcular el radio necesario para cubrir toda la pantalla
    const maxRadius = Math.sqrt(
      Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
    );

    // Determinar el nuevo tema
    const newTheme = this.isDarkTheme ? 'light' : 'dark';

    // Cambiar el tema ANTES de crear el overlay para que las variables CSS estén disponibles
    this.themeService.toggleTheme();

    // Crear un overlay temporal con el tema anterior
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = '10000';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'clip-path 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';

    // Aplicar el tema ANTERIOR al overlay (el que se va)
    if (newTheme === 'light') {
      // Si cambiamos a claro, el overlay debe mostrar el tema oscuro que se va
      overlay.style.backgroundColor = '#1D2633';
      overlay.style.color = '#ffffff';
    } else {
      // Si cambiamos a oscuro, el overlay debe mostrar el tema claro que se va
      overlay.style.backgroundColor = '#E9E9E9';
      overlay.style.color = '#333333';
    }

    // El clip-path inicial cubre toda la pantalla
    overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;

    // Añadir el overlay al body
    document.body.appendChild(overlay);
    this.isTransitioning = true;

    // Contraer el círculo gradualmente para revelar el nuevo tema debajo
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(20px at ${x}px ${y}px)`;
    });

    // Remover el overlay cuando termine la animación
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      this.isTransitioning = false;
    }, 500);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
