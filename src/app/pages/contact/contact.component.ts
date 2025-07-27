import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  
  // Configuración de EmailJS - REEMPLAZA CON TUS DATOS REALES
  private readonly EMAIL_SERVICE_ID = 'service_camilosilva';
  private readonly EMAIL_TEMPLATE_ID = 'template_camilosilva';
  private readonly EMAIL_PUBLIC_KEY = 'j8siC2ehI1b2ZOOD3';

  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isFormSubmitting = false;
  formSubmitted = false;
  errorMessage = '';

  constructor() {
    // Inicializar EmailJS
    emailjs.init(this.EMAIL_PUBLIC_KEY);
  }

  // Enlaces de redes sociales
  socialLinks = {
    linkedin: 'https://linkedin.com/in/camilosilva-id',
    whatsapp: 'https://wa.me/5491138824544',
    github: 'https://github.com/camilo-silva',
    email: 'mailto:camilosilva.0301@outlook.com'
  };

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.isFormSubmitting = true;
    this.errorMessage = '';

    try {
      // Preparar los datos para el template de EmailJS
      const templateParams = {
        from_name: this.contactForm.name,
        from_email: this.contactForm.email,
        subject: this.contactForm.subject,
        message: this.contactForm.message,
        reply_to: this.contactForm.email
      };

      // Enviar email usando EmailJS
      const response = await emailjs.send(
        this.EMAIL_SERVICE_ID,
        this.EMAIL_TEMPLATE_ID,
        templateParams
      );
      
      // Simular delay para UX
      setTimeout(() => {
        this.isFormSubmitting = false;
        this.formSubmitted = true;
        this.resetForm();

        // Resetear mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
      }, 1000);

    } catch (error: any) {
      this.isFormSubmitting = false;
      
      // Mensajes de error más específicos
      if (error?.status === 400) {
        this.errorMessage = 'Error de configuración. Verifica las credenciales de EmailJS.';
      } else if (error?.status === 401) {
        this.errorMessage = 'Error de autenticación. Verifica tu Public Key.';
      } else if (error?.status === 404) {
        this.errorMessage = 'Servicio o template no encontrado. Verifica los IDs.';
      } else {
        this.errorMessage = `Error al enviar: ${error?.message || 'Error desconocido'}. Intenta nuevamente o contáctame por WhatsApp.`;
      }
      
      // Resetear mensaje de error después de 10 segundos para errores técnicos
      setTimeout(() => {
        this.errorMessage = '';
      }, 10000);
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim() &&
      this.isValidEmail(this.contactForm.email)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  openWhatsApp(): void {
    const message = encodeURIComponent('¡Hola Camilo! Me gustaría contactarte sobre oportunidades profesionales.');
    window.open(`https://wa.me/5491138824544?text=${message}`, '_blank');
  }

  openLinkedIn(): void {
    window.open(this.socialLinks.linkedin, '_blank');
  }

  openGitHub(): void {
    window.open(this.socialLinks.github, '_blank');
  }

  sendEmail(): void {
    window.open(this.socialLinks.email, '_blank');
  }
}
