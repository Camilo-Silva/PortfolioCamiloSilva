import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface EmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_email: string;
  reply_to: string;
  [key: string]: string; // Índice de tipo string
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private config: EmailConfig = {
    // IMPORTANTE: Reemplaza estos valores con los tuyos de EmailJS
    serviceId: 'service_camilosilva', // Service ID de EmailJS
    templateId: 'template_camilosilva', // Template ID de EmailJS
    publicKey: 'j8siC2ehI1b2ZOOD3' // Public Key de EmailJS
  };

  constructor() {
    // Inicializar EmailJS
    emailjs.init(this.config.publicKey);
  }

  async sendEmail(emailData: EmailData): Promise<any> {
    try {
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        emailData
      );
      
      console.log('Email enviado exitosamente:', response);
      return response;
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw error;
    }
  }

  // Método para configurar las credenciales (opcional)
  updateConfig(config: Partial<EmailConfig>): void {
    this.config = { ...this.config, ...config };
    emailjs.init(this.config.publicKey);
  }
}
