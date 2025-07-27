import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { LogoComponent } from '../logo/logo.component';
import { NavbarToggleComponent } from '../navbar-toggle/navbar-toggle.component';
import { MenuOverlayComponent } from '../menu-overlay/menu-overlay.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, NavbarToggleComponent, MenuOverlayComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkTheme = false;
  isMenuOpen = false;
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
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

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
