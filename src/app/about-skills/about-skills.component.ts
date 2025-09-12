import { Component, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-skills.component.html',
  styleUrls: ['./about-skills.component.scss']
})
export class AboutSkillsComponent implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSkillsFilter();
      this.animateSkillsOnScroll();
    }
  }

  // Inicializar filtros de habilidades
  private initializeSkillsFilter(): void {
    const filterButtons = this.elementRef.nativeElement.querySelectorAll('.filter-btn');
    const skillItems = this.elementRef.nativeElement.querySelectorAll('.skill-item');

    filterButtons.forEach((button: HTMLElement) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Actualizar estado activo de botones
        filterButtons.forEach((btn: HTMLElement) => btn.classList.remove('active'));
        button.classList.add('active');

        // Scroll automático al título - usando CSS scroll-margin-top
        const skillsTitle = this.elementRef.nativeElement.querySelector('#skills-title');
        if (skillsTitle) {
          skillsTitle.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }

        // Filtrar skill items
        skillItems.forEach((item: HTMLElement) => {
          if (filter === 'all' || item.classList.contains(filter!)) {
            item.style.display = 'flex';
            // Re-trigger animation
            setTimeout(() => {
              item.classList.add('animate-in');
            }, 100);
          } else {
            item.style.display = 'none';
            item.classList.remove('animate-in');
          }
        });
      });
    });
  }

  // Animar habilidades cuando entran en el viewport
  private animateSkillsOnScroll(): void {
    // Solo ejecutar en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillItem = entry.target as HTMLElement;
          const levelBar = skillItem.querySelector('.skill-level') as HTMLElement;
          const level = levelBar?.getAttribute('data-level');
          
          // Animar barra de nivel
          if (levelBar && level) {
            setTimeout(() => {
              levelBar.style.setProperty('--skill-level', `${level}%`);
            }, 200);
          }
          
          // Agregar clase de animación
          skillItem.classList.add('animate-in');
          
          // Dejar de observar este elemento
          observer.unobserve(skillItem);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos los skill items
    const skillItems = this.elementRef.nativeElement.querySelectorAll('.skill-item');
    skillItems.forEach((item: HTMLElement) => {
      observer.observe(item);
    });
  }
}
