import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit, OnDestroy {
  title = 'Camilo Silva - Portfolio';
  currentTheme: 'light' | 'dark' = 'light';
  logoPath = '';
  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      this.updateLogoPath();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateLogoPath(): void {
    this.logoPath = this.currentTheme === 'light' 
      ? 'assets/images/CSLIGTH1.png' 
      : 'assets/images/CSDARK1.png';
  }
}
