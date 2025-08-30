import { Component, Input, Output, EventEmitter, HostListener, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() project: Project | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  currentMediaIndex = 0;
  currentMediaType: 'image' | 'video' = 'video'; // Iniciar con video por defecto
  private autoPlayInterval: any;
  private readonly autoPlayDelay = 4000; // 4 segundos entre imágenes
  private isAutoPlayDisabled = false; // Para deshabilitar cuando el usuario interactúa
  
  // Cache para URLs de video seguras
  private safeVideoUrls: SafeResourceUrl[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Inicializar currentMediaIndex y currentMediaType al cargar el componente
    this.currentMediaIndex = 0;
    if (this.project?.videos && this.project.videos.length > 0) {
      this.currentMediaType = 'video';
    } else if (this.project?.imagenes && this.project.imagenes.length > 0) {
      this.currentMediaType = 'image';
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Inicia el auto-play del carrusel
  private startAutoPlay(): void {
    // Calcular total de medios disponibles
    const totalImages = this.project?.imagenes?.length || 0;
    const totalVideos = this.project?.videos?.length || 0;
    const totalMedia = totalImages + totalVideos;
    
    // Iniciar auto-play si hay más de 1 medio y no está deshabilitado
    if (this.project && totalMedia > 1 && !this.isAutoPlayDisabled) {
      this.autoPlayInterval = setInterval(() => {
        this.nextMediaAutoPlay(); // Navega entre todos los medios
      }, this.autoPlayDelay);
    }
  }

  // Detiene el auto-play del carrusel
  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // Deshabilita el auto-play permanentemente cuando el usuario interactúa
  private disableAutoPlay(): void {
    this.isAutoPlayDisabled = true;
    this.stopAutoPlay();
  }

  // Método para manejar cuando el modal se abre/cierra
  ngOnChanges(): void {
    // Crear URLs seguras cuando cambia el proyecto
    if (this.project && this.project.videos) {
      this.safeVideoUrls = this.project.videos.map(video => {
        const embedUrl = this.getEmbedUrl(video);
        return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      });
    }
    
    if (this.isOpen && this.project) {
      const totalImages = this.project.imagenes?.length || 0;
      
      // Solo iniciar autoplay si hay más de 1 imagen
      if (totalImages > 1) {
        setTimeout(() => this.startAutoPlay(), 1000);
      }
    } else {
      // Detener auto-play cuando se cierra el modal
      this.stopAutoPlay();
    }
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.stopAutoPlay();
    this.closeModal.emit();
    this.currentMediaIndex = 0;
    // Resetear al primer tipo disponible (videos tienen prioridad)
    if (this.project?.videos && this.project.videos.length > 0) {
      this.currentMediaType = 'video';
    } else {
      this.currentMediaType = 'image';
    }
    this.isAutoPlayDisabled = false; // Resetear estado para la próxima apertura
  }

  // Nuevos métodos para manejar galería de medios (imágenes + videos)
  getTotalMediaCount(): number {
    if (!this.project) return 0;
    const imageCount = this.project.imagenes?.length || 0;
    const videoCount = this.project.videos?.length || 0;
    return imageCount + videoCount;
  }

  previousMedia(): void {
    this.disableAutoPlay();
    const totalImages = this.project?.imagenes?.length || 0;
    const totalVideos = this.project?.videos?.length || 0;
    
    if (this.currentMediaType === 'image' && this.currentMediaIndex === 0) {
      // Si estamos en la primera imagen, ir al último video
      if (totalVideos > 0) {
        this.currentMediaType = 'video';
        this.currentMediaIndex = totalVideos - 1;
      } else {
        // Si no hay videos, ir a la última imagen
        this.currentMediaIndex = totalImages - 1;
      }
    } else if (this.currentMediaType === 'video' && this.currentMediaIndex === 0) {
      // Si estamos en el primer video, ir a la última imagen
      if (totalImages > 0) {
        this.currentMediaType = 'image';
        this.currentMediaIndex = totalImages - 1;
      } else {
        // Si no hay imágenes, ir al último video
        this.currentMediaIndex = totalVideos - 1;
      }
    } else {
      // Ir al medio anterior del mismo tipo
      this.currentMediaIndex--;
    }
  }

  nextMedia(): void {
    this.disableAutoPlay();
    const totalImages = this.project?.imagenes?.length || 0;
    const totalVideos = this.project?.videos?.length || 0;
    
    if (this.currentMediaType === 'image' && this.currentMediaIndex === totalImages - 1) {
      // Si estamos en la última imagen, ir al primer video
      if (totalVideos > 0) {
        this.currentMediaType = 'video';
        this.currentMediaIndex = 0;
      } else {
        // Si no hay videos, ir a la primera imagen
        this.currentMediaIndex = 0;
      }
    } else if (this.currentMediaType === 'video' && this.currentMediaIndex === totalVideos - 1) {
      // Si estamos en el último video, ir a la primera imagen
      if (totalImages > 0) {
        this.currentMediaType = 'image';
        this.currentMediaIndex = 0;
      } else {
        // Si no hay imágenes, ir al primer video
        this.currentMediaIndex = 0;
      }
    } else {
      // Ir al siguiente medio del mismo tipo
      this.currentMediaIndex++;
    }
  }

  // Método específico para autoplay - navega entre TODOS los medios (videos primero, luego imágenes) en bucle continuo
  private nextMediaAutoPlay(): void {
    const totalImages = this.project?.imagenes?.length || 0;
    const totalVideos = this.project?.videos?.length || 0;
    const totalMedia = totalImages + totalVideos;
    
    if (totalMedia === 0) return;
    
    if (this.currentMediaType === 'image') {
      if (this.currentMediaIndex === totalImages - 1) {
        // Si estamos en la última imagen, ir al primer video o volver a primera imagen
        if (totalVideos > 0) {
          this.currentMediaType = 'video';
          this.currentMediaIndex = 0;
        } else {
          // Solo hay imágenes, volver a la primera imagen
          this.currentMediaIndex = 0;
        }
      } else {
        // Ir a la siguiente imagen
        this.currentMediaIndex++;
      }
    } else if (this.currentMediaType === 'video') {
      if (this.currentMediaIndex === totalVideos - 1) {
        // Si estamos en el último video, ir a la primera imagen o primer video
        if (totalImages > 0) {
          this.currentMediaType = 'image';
          this.currentMediaIndex = 0;
        } else {
          // Solo hay videos, volver al primer video
          this.currentMediaIndex = 0;
        }
      } else {
        // Ir al siguiente video
        this.currentMediaIndex++;
      }
    }
  }

  goToMedia(type: 'image' | 'video', index: number): void {
    this.disableAutoPlay();
    this.currentMediaType = type;
    this.currentMediaIndex = index;
  }

  getEmbedUrl(videoUrl: string): string {
    // Limpiar parámetros adicionales de la URL
    const cleanUrl = videoUrl.split('?')[0];
    
    // Convertir URL de Google Drive a formato embebido
    const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const fileId = match[1];
      // Volver al formato preview que funcionaba
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return embedUrl;
    }
    
    // Si es YouTube, convertir a formato embebido
    const youtubeMatch = cleanUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return videoUrl; // Devolver URL original si no se puede convertir
  }

  // Método para obtener los usuarios de prueba estructurados
  get testUsers() {
    // Solo mostrar para el proyecto de Sistema de Gestión de Turnos
    if (!this.project?.hasFlowDetails || this.project.id !== '3') return [];
    
    return [
      {
        emoji: '👨‍💼',
        title: 'Admin',
        email: 'admin@turno-smart.com',
        password: 'Admin123!'
      },
      {
        emoji: '👤',
        title: 'Paciente',
        email: 'paciente15@turno-smart.com.ar',
        password: 'cualquiera1'
      },
      {
        emoji: '⚕️',
        title: 'Médico',
        email: 'medico1@turno-smart.com.ar',
        password: 'NuevoMedic0!'
      },
      {
        emoji: '👩‍💼',
        title: 'Recepcionista',
        email: 'recepcion1@turno-smart.com.ar',
        password: 'Recep123!'
      }
    ];
  }

  // Método para copiar texto al portapapeles
  async copyToClipboard(text: string, feedbackKey: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      // Mostrar feedback visual temporal
      this.showCopyFeedback(feedbackKey);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
      // Fallback para navegadores que no soportan clipboard API
      this.fallbackCopy(text, feedbackKey);
    }
  }

  // Feedback visual para la copia
  private copyFeedback: { [key: string]: boolean } = {};
  
  private showCopyFeedback(feedbackKey: string): void {
    this.copyFeedback[feedbackKey] = true;
    setTimeout(() => {
      this.copyFeedback[feedbackKey] = false;
    }, 2000); // Mostrar feedback por 2 segundos
  }

  // Método de respaldo para copiar en navegadores antiguos
  private fallbackCopy(text: string, feedbackKey: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopyFeedback(feedbackKey);
      console.log('Texto copiado usando fallback');
    } catch (err) {
      console.error('Error en fallback copy:', err);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  // Verificar si el feedback de copia está activo
  isCopyFeedbackActive(userId: number, type: 'email' | 'password'): boolean {
    return this.copyFeedback[`${userId}-${type}`] || false;
  }

  // Método para obtener los roles estructurados
  get userRoles() {
    // Solo mostrar para el proyecto de Sistema de Gestión de Turnos
    if (!this.project?.hasFlowDetails || this.project.id !== '3') return [];
    
    return [
      {
        emoji: '👨‍💼',
        title: 'Administrador',
        subtitle: 'Acceso Completo:',
        features: [
          'Dashboard general',
          'Gestión de médicos',
          'Gestión de pacientes',
          'Especialidades médicas',
          'Todos los turnos',
          'Historiales completos'
        ]
      },
      {
        emoji: '👤',
        title: 'Paciente',
        subtitle: 'Auto-gestión:',
        features: [
          'Ver y editar perfil',
          'Reservar turnos',
          'Ver mis turnos',
          'Cambiar contraseña'
        ],
        extra: 'Registro: Formulario completo con DNI, email, fecha nacimiento'
      },
      {
        emoji: '⚕️',
        title: 'Médico',
        subtitle: 'Gestión Médica:',
        features: [
          'Mi agenda diaria',
          'Crear historiales',
          'Ver mis pacientes',
          'Gestionar citas'
        ],
        extra: 'Historiales: Síntomas, diagnóstico, tratamiento, prescripciones'
      },
      {
        emoji: '👩‍💼',
        title: 'Recepcionista',
        subtitle: 'Coordinación:',
        features: [
          'Registrar pacientes',
          'Confirmar agenda médica',
          'Gestionar turnos',
          'Atención al cliente'
        ],
        extra: 'Workflow: Primera línea de contacto y coordinación'
      }
    ];
  }

  // Método para formatear el contenido del flujo como HTML
  getFormattedFlowContent(): string {
    // Solo mostrar para el proyecto de Sistema de Gestión de Turnos
    if (!this.project?.hasFlowDetails || this.project.id !== '3') {
      return '';
    }

    // Solo mostrar el flujo de reserva de turnos como texto simple
    return `
      <h2>📋 Flujo de Reserva de Turnos</h2>
      <p><strong>Proceso Simplificado:</strong></p>
      <ol>
        <li><strong>Especialidad</strong> → Elegir área médica</li>
        <li><strong>Médico</strong> → Seleccionar profesional</li>
        <li><strong>Horario</strong> → Fecha y hora disponible</li>
        <li><strong>Confirmación</strong> → Turno reservado</li>
      </ol>
    `;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.onClose();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  onFullscreenChange(event: Event): void {
    console.log('Fullscreen change detected', {
      isFullscreen: !!document.fullscreenElement,
      currentMediaType: this.currentMediaType,
      currentMediaIndex: this.currentMediaIndex
    });
    // NO hacer nada aquí - dejar que funcione normalmente
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  onArrowLeft(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.previousMedia();
    }
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  onArrowRight(event: KeyboardEvent): void {
    if (this.isOpen) {
      // Deshabilitar auto-play cuando se navega con teclado
      this.disableAutoPlay();
      this.nextMedia();
    }
  }

  // Método para crear URL segura para el iframe
  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    const embedUrl = this.getEmbedUrl(videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Método optimizado para obtener URL segura por índice (evita recrear URLs)
  getSafeVideoUrlByIndex(index: number): SafeResourceUrl {
    return this.safeVideoUrls[index] || this.getSafeVideoUrl(this.project?.videos?.[index] || '');
  }

}
