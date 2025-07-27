// Configuración de EmailJS
// IMPORTANTE: Reemplaza estos valores con los tuyos reales de https://emailjs.com

export const emailConfig = {
  serviceId: 'service_camilosilva',        // Service ID de EmailJS
  templateId: 'template_camilosilva',      // Template ID de EmailJS  
  publicKey: 'j8siC2ehI1b2ZOOD3'         // Public Key de EmailJS
};

// Instrucciones para configurar EmailJS:
// 1. Ve a https://emailjs.com y crea una cuenta
// 2. Crea un nuevo servicio (Gmail, Outlook, etc.)
// 3. Crea un template de email con estas variables:
//    - {{from_name}} - Nombre del remitente
//    - {{from_email}} - Email del remitente  
//    - {{subject}} - Asunto del mensaje
//    - {{message}} - Contenido del mensaje
//    - {{to_email}} - Tu email (camilosilva.0301@outlook.com)
//    - {{reply_to}} - Email para responder
// 4. Obtén tu Public Key de la sección Account
// 5. Reemplaza los valores arriba con los reales
