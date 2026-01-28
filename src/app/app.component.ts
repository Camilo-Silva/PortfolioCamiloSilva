import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { WhatsappFloatComponent } from './shared/whatsapp-float/whatsapp-float.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WhatsappFloatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-camilo';

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Cambiar video según el tema actual al iniciar
      this.updateBackgroundVideo(this.themeService.getCurrentTheme());

      // Suscribirse a cambios de tema
      this.themeService.theme$.subscribe(theme => {
        this.updateBackgroundVideo(theme);
      });
    }
  }

  private updateBackgroundVideo(theme: 'light' | 'dark'): void {
    if (isPlatformBrowser(this.platformId)) {
      const video = document.getElementById('bg-video') as HTMLVideoElement;
      if (video) {
        const source = video.querySelector('source');
        if (source) {
          const newVideoSrc = theme === 'dark' 
            ? 'assets/videos/background.mp4' 
            : 'assets/videos/backgroundLight.mp4';
          
          if (source.src !== newVideoSrc) {
            source.src = newVideoSrc;
            video.load();
          }
        }
      }
    }
  }
}
