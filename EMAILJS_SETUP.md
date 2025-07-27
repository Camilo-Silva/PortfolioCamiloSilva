# 📧 Configuración de EmailJS para Formulario de Contacto

## ¿Qué es EmailJS?
EmailJS es un servicio que permite enviar emails directamente desde JavaScript sin necesidad de un servidor backend. Es gratuito hasta 200 emails por mes.

## 🚀 Pasos para Configurar

### 1. Crear cuenta en EmailJS
- Ve a [https://emailjs.com](https://emailjs.com)
- Regístrate con tu email
- Verifica tu cuenta

### 2. Configurar Servicio de Email
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor (Gmail, Outlook, etc.)
- Sigue las instrucciones para conectar tu email
- **Guarda el Service ID** que aparece

### 3. Crear Template de Email
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa este template básico:

```
Asunto: Nuevo mensaje de contacto - {{subject}}

Hola Camilo,

Has recibido un nuevo mensaje de contacto desde tu portfolio:

De: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu formulario de contacto.
Para responder, usa: {{reply_to}}
```

- **Guarda el Template ID**

### 4. Obtener Public Key
- Ve a "Account" en el menú
- Copia tu "Public Key"

### 5. Configurar en el Proyecto
1. Abre el archivo: `src/app/config/email.config.ts`
2. Reemplaza los valores:
   ```typescript
   export const emailConfig = {
     serviceId: 'tu_service_id_real',
     templateId: 'tu_template_id_real', 
     publicKey: 'tu_public_key_real'
   };
   ```

### 6. Actualizar el Componente
1. Abre: `src/app/pages/contact/contact.component.ts`
2. Reemplaza las constantes:
   ```typescript
   private readonly EMAIL_SERVICE_ID = 'tu_service_id_real';
   private readonly EMAIL_TEMPLATE_ID = 'tu_template_id_real'; 
   private readonly EMAIL_PUBLIC_KEY = 'tu_public_key_real';
   ```

## 🎯 Resultado
Una vez configurado:
- Los emails llegarán a tu casilla (camilosilva.0301@outlook.com)
- Tendrás toda la información del contacto
- Podrás responder directamente desde tu email
- El formulario mostrará mensajes de éxito/error apropiados

## 🔒 Seguridad
- La Public Key es segura para usar en frontend
- No expongas nunca tu Private Key
- EmailJS maneja la autenticación de forma segura

## 📊 Límites Gratuitos
- 200 emails por mes
- Para más volumen, considera el plan pago

¡Una vez configurado, tendrás un sistema de contacto profesional y funcional!
