import { Component, Input, Output, EventEmitter, HostListener, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  currentImageIndex = 0;
  private autoPlayInterval: any;
  private readonly autoPlayDelay = 4000; // 4 segundos entre imágenes
  private isAutoPlayDisabled = false; // Para deshabilitar cuando el usuario interactúa

  ngOnInit(): void {
    // El auto-play se iniciará cuando se abra el modal
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Inicia el auto-play del carrusel
  private startAutoPlay(): void {
    if (this.project && this.project.imagenes.length > 1 && !this.isAutoPlayDisabled) {
      this.autoPlayInterval = setInterval(() => {
        this.nextImage();
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
    if (this.isOpen && this.project && this.project.imagenes.length > 1) {
      // Iniciar auto-play cuando se abre el modal
      setTimeout(() => this.startAutoPlay(), 1000); // Esperar 1 segundo antes de iniciar
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
    this.currentImageIndex = 0;
    this.isAutoPlayDisabled = false; // Resetear estado para la próxima apertura
  }

  previousImage(): void {
    if (this.project && this.project.imagenes.length > 1) {
      // Deshabilitar auto-play cuando el usuario navega manualmente
      this.disableAutoPlay();
      this.currentImageIndex = 
        this.currentImageIndex === 0 
          ? this.project.imagenes.length - 1 
          : this.currentImageIndex - 1;
    }
  }

  nextImage(): void {
    if (this.project && this.project.imagenes.length > 1) {
      this.currentImageIndex = 
        this.currentImageIndex === this.project.imagenes.length - 1 
          ? 0 
          : this.currentImageIndex + 1;
    }
  }

  goToImage(index: number): void {
    // Deshabilitar auto-play cuando el usuario selecciona una imagen específica
    this.disableAutoPlay();
    this.currentImageIndex = index;
  }

  // Método para obtener los usuarios de prueba estructurados
  get testUsers() {
    // Solo mostrar para el proyecto de Sistema de Gestión de Turnos
    if (!this.project?.hasFlowDetails || this.project.id !== '2') return [];
    
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
    if (!this.project?.hasFlowDetails || this.project.id !== '2') return [];
    
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
    if (!this.project?.hasFlowDetails || this.project.id !== '2') {
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

  @HostListener('document:keydown.arrowLeft', ['$event'])
  onArrowLeft(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.previousImage();
    }
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  onArrowRight(event: KeyboardEvent): void {
    if (this.isOpen) {
      // Deshabilitar auto-play cuando se navega con teclado
      this.disableAutoPlay();
      this.nextImage();
    }
  }

}
