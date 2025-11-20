import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-float.component.html',
  styleUrl: './whatsapp-float.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('pulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulsing', style({ transform: 'scale(1.1)' })),
      transition('normal <=> pulsing', animate('300ms ease-in-out'))
    ])
  ]
})
export class WhatsappFloatComponent implements OnInit, OnDestroy {
  // WhatsApp Configuration
  private readonly WHATSAPP_NUMBER = '5491138824544';
  private readonly DEFAULT_MESSAGE = '¡Hola! Me interesa contactarte.';

  // Component State
  isVisible = false;
  isHovered = false;
  showTooltip = false;
  pulseState: 'normal' | 'pulsing' = 'normal';

  // Timer IDs
  private showTimer?: any;
  private pulseTimer?: any;
  private tooltipTimer?: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Mostrar el botón después de 1.5 segundos para mejor UX
      this.showTimer = setTimeout(() => {
        this.isVisible = true;
        this.startPulseAnimation();
      }, 1500);

      // Mostrar tooltip automáticamente después de 3 segundos
      this.tooltipTimer = setTimeout(() => {
        if (!this.isHovered) {
          this.showTooltip = true;
          setTimeout(() => {
            this.showTooltip = false;
          }, 3000);
        }
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    // Limpiar timers
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.pulseTimer) clearInterval(this.pulseTimer);
    if (this.tooltipTimer) clearTimeout(this.tooltipTimer);
  }

  /**
   * 🚀 Iniciar animación de pulso cada 5 segundos
   */
  private startPulseAnimation(): void {
    this.pulseTimer = setInterval(() => {
      if (!this.isHovered) {
        this.pulseState = 'pulsing';
        setTimeout(() => {
          this.pulseState = 'normal';
        }, 300);
      }
    }, 5000);
  }

  /**
   * Abrir WhatsApp con mensaje predefinido
   */
  openWhatsApp(): void {
    if (isPlatformBrowser(this.platformId)) {
      const encodedMessage = encodeURIComponent(this.DEFAULT_MESSAGE);
      const whatsappUrl = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Abrir en nueva pestaña con noopener para seguridad
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Tracking analytics (opcional)
      this.trackWhatsAppClick();
    }
  }

  /**
   * 🎯 Manejar hover
   */
  onMouseEnter(): void {
    this.isHovered = true;
    this.showTooltip = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
    setTimeout(() => {
      if (!this.isHovered) {
        this.showTooltip = false;
      }
    }, 300);
  }

  /**
   * 📊 Tracking de clicks (integrar con GA o analytics)
   */
  private trackWhatsAppClick(): void {
    // Aquí puedes integrar con Google Analytics, Mixpanel, etc.
    console.log('WhatsApp button clicked');

    // Ejemplo con Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'WhatsApp Float Button',
        value: 1
      });
    }
  }
}
