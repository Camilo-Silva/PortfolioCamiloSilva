import { Component, OnInit, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
  isDownloading = false; // Para mostrar estado de descarga
  downloadMessage = ''; // Para mostrar mensajes de feedback

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  ngAfterViewInit(): void {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSkillsFilter();
      this.animateSkillsOnScroll();
    }
  }

  // Método para abrir CV en nueva pestaña
  openCV(format: 'pdf' | 'jpg'): void {
    if (this.isDownloading) {
      return; // Evitar múltiples operaciones simultáneas
    }
    
    this.isDownloading = true;
    this.downloadMessage = '';
    const fileName = format === 'pdf' ? 'CV.pdf' : 'CV.jpg';
    const filePath = `/assets/images/${fileName}`;
    
    try {
      // Verificar si el archivo existe antes de intentar abrirlo
      this.checkFileExists(filePath).then(exists => {
        if (exists) {
          // Abrir en nueva pestaña
          window.open(filePath, '_blank');
          
          // Mostrar mensaje de éxito
          this.downloadMessage = `✅ CV abierto en nueva pestaña`;
          console.log(`CV en formato ${format.toUpperCase()} abierto en nueva pestaña`);
          
          // Limpiar mensaje después de 3 segundos
          setTimeout(() => {
            this.downloadMessage = '';
          }, 3000);
          
        } else {
          throw new Error(`El archivo ${fileName} no se encuentra disponible`);
        }
      }).catch(error => {
        console.error('Error al abrir el archivo:', error);
        this.downloadMessage = `❌ Error: ${error.message || 'No se pudo abrir el archivo'}`;
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.downloadMessage = '';
        }, 5000);
      }).finally(() => {
        this.isDownloading = false;
      });
      
    } catch (error) {
      console.error('Error al abrir el archivo:', error);
      this.downloadMessage = `❌ Error al abrir el CV en formato ${format.toUpperCase()}`;
      this.isDownloading = false;
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        this.downloadMessage = '';
      }, 5000);
    }
  }

  downloadCV(format: 'pdf' | 'jpg'): void {
    if (this.isDownloading) {
      return; // Evitar múltiples descargas simultáneas
    }
    
    this.isDownloading = true;
    this.downloadMessage = '';
    const fileName = format === 'pdf' ? 'CV.pdf' : 'CV.jpg';
    const filePath = `/assets/images/${fileName}`;
    const downloadName = `CV_Camilo_Silva.${format}`;
    
    try {
      // Verificar si el archivo existe antes de intentar descargarlo
      this.checkFileExists(filePath).then(exists => {
        if (exists) {
          // Crear elemento de enlace temporal para la descarga
          const link = document.createElement('a');
          link.href = filePath;
          link.download = downloadName;
          link.target = '_blank';
          
          // Agregar al DOM temporalmente
          document.body.appendChild(link);
          
          // Hacer clic programáticamente
          link.click();
          
          // Remover del DOM
          document.body.removeChild(link);
          
          // Mostrar mensaje de éxito
          this.downloadMessage = `✅ CV en formato ${format.toUpperCase()} descargado correctamente`;
          console.log(`Descarga de CV en formato ${format.toUpperCase()} iniciada`);
          
          // Limpiar mensaje después de 3 segundos
          setTimeout(() => {
            this.downloadMessage = '';
          }, 3000);
          
        } else {
          throw new Error(`El archivo ${fileName} no se encuentra disponible`);
        }
      }).catch(error => {
        console.error('Error al descargar el archivo:', error);
        this.downloadMessage = `❌ Error: ${error.message || 'No se pudo descargar el archivo'}`;
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.downloadMessage = '';
        }, 5000);
      }).finally(() => {
        this.isDownloading = false;
      });
      
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      this.downloadMessage = `❌ Error al descargar el CV en formato ${format.toUpperCase()}`;
      this.isDownloading = false;
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        this.downloadMessage = '';
      }, 5000);
    }
  }

  // Método auxiliar para verificar si un archivo existe
  private async checkFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Inicializar filtros de habilidades
  private initializeSkillsFilter(): void {
    const filterButtons = this.elementRef.nativeElement.querySelectorAll('.filter-btn');
    const skillItems = this.elementRef.nativeElement.querySelectorAll('.skill-item');

    filterButtons.forEach((button: HTMLElement) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover clase active de todos los botones
        filterButtons.forEach((btn: HTMLElement) => btn.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filtrar elementos
        skillItems.forEach((item: HTMLElement) => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            // Animar entrada
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 100);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
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
              levelBar.style.width = `${level}%`;
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
