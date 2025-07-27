import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isFormSubmitting = false;
  formSubmitted = false;

  // Enlaces de redes sociales
  socialLinks = {
    linkedin: 'https://linkedin.com/in/camilosilva-id',
    whatsapp: 'https://wa.me/5491138824544',
    github: 'https://github.com/camilo-silva',
    email: 'mailto:camilo.silva@example.com'
  };

  onSubmit(): void {
    if (this.isFormValid()) {
      this.isFormSubmitting = true;

      // Simular envío del formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactForm);
        this.isFormSubmitting = false;
        this.formSubmitted = true;
        this.resetForm();

        // Resetear mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
      }, 2000);
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
