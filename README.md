# 🚀 Portfolio Profesional - Camilo Silva

[![Angular](https://img.shields.io/badge/Angular-17.3-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-CSS3-pink?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

> Portfolio profesional moderno desarrollado con Angular 17+, diseñado para mostrar proyectos, habilidades y experiencia profesional con una interfaz intuitiva y responsiva.

## 🌟 Demo en Vivo

🔗 **[Ver Portfolio](https://tu-dominio.com)** | 📧 **[Contacto](mailto:camilosilva.0301@outlook.com)**

## ✨ Características Principales

### 🎨 Diseño & UX

- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Tema Dinámico**: Toggle animado entre modo claro y oscuro con transiciones fluidas
- **Animaciones Avanzadas**: Transiciones suaves y efectos visuales modernos
- **Navegación Intuitiva**: Menu overlay con navegación fluida entre secciones

### 🔧 Funcionalidades

- **Galería de Proyectos**: Showcase interactivo de proyectos con modales detallados
- **Formulario de Contacto**: Integración con EmailJS para envío directo de mensajes
- **CV Descargable**: Descarga directa del currículum profesional
- **Links Sociales**: Integración con redes sociales y plataformas profesionales

### ⚡ Performance & SEO

- **Server-Side Rendering (SSR)**: Optimización para SEO y velocidad de carga
- **Progressive Web App (PWA)**: Funcionalidad offline y instalación en dispositivos
- **Lazy Loading**: Carga optimizada de componentes y recursos
- **Meta Tags Dinámicos**: SEO optimizado para cada sección

## 🛠️ Stack Tecnológico

### Frontend Core

```json
{
  "framework": "Angular 17.3",
  "language": "TypeScript 5.4",
  "styling": "SCSS + CSS Variables",
  "architecture": "Standalone Components"
}
```

### Dependencias Principales

| Tecnología            | Versión | Propósito                              |
| ---------------------- | -------- | --------------------------------------- |
| **Angular Core** | 17.3.0   | Framework principal                     |
| **Angular SSR**  | 17.3.1   | Server-Side Rendering                   |
| **RxJS**         | 7.8.0    | Programación reactiva                  |
| **EmailJS**      | 4.4.1    | Servicio de contacto                    |
| **HTML2Canvas**  | 1.4.1    | Captura de screenshots para animaciones |
| **Express**      | 4.18.2   | Servidor para SSR                       |

### Herramientas de Desarrollo

- **Angular CLI** 17.3.1 - Tooling y scaffolding
- **TypeScript** - Tipado estático y mejor DX
- **Karma + Jasmine** - Testing framework
- **Angular DevKit** - Build tools optimizados

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── pages/                 # Páginas principales
│   │   ├── home/             # Página de inicio
│   │   ├── about/            # Acerca de mí
│   │   ├── projects/         # Galería de proyectos
│   │   └── contact/          # Página de contacto
│   ├── shared/               # Componentes compartidos
│   │   ├── header/           # Navegación principal
│   │   ├── logo/             # Componente del logo
│   │   └── menu-overlay/     # Menu móvil
│   ├── services/             # Servicios de la aplicación
│   │   ├── theme.service.ts  # Gestión de temas
│   │   └── projects.service.ts # Gestión de proyectos
│   └── contact/              # Módulo de contacto
│       ├── contact-form/     # Formulario de contacto
│       └── social-links/     # Enlaces sociales
├── assets/                   # Recursos estáticos
│   └── images/               # Imágenes del portfolio
└── styles.scss              # Estilos globales y variables CSS
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- **Node.js** 18+
- **npm** 9+ o **yarn**
- **Angular CLI** 17+

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Camilo-Silva/PortfolioCamiloSilva.git
cd portfolio-camilo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# El proyecto estará disponible en http://localhost:4200
```

### Scripts Disponibles

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run watch            # Build con watch mode

# Producción
npm run build            # Build para producción
npm run build:prod       # Build optimizado
npm run build:netlify    # Build para Netlify

# SSR
npm run serve:ssr:portfolio-camilo  # Servidor SSR
```

## 🎯 Características Técnicas Destacadas

### 🎨 Sistema de Temas Avanzado

- **Toggle Animado**: Transición con efecto de círculo expandido usando clip-path CSS
- **Persistencia**: Guarda preferencia del usuario en localStorage
- **Detección Automática**: Respeta preferencia del sistema operativo
- **Variables CSS Dinámicas**: Cambio fluido de toda la paleta de colores

### 📱 Responsive Design

- **Mobile-First**: Diseño optimizado desde dispositivos móviles
- **Breakpoints Personalizados**: Adaptación fluida a diferentes tamaños
- **Touch Gestures**: Interacciones optimizadas para dispositivos táctiles
- **Performance Móvil**: Optimizado para conexiones lentas

### 🔄 Gestión de Estado

- **Servicios Reactivos**: Uso de RxJS para estado global
- **Standalone Components**: Arquitectura moderna de Angular
- **OnPush Strategy**: Optimización de detección de cambios
- **Memory Management**: Correcta limpieza de subscripciones

## 📊 Performance & Métricas

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizaciones Implementadas

- ✅ Tree Shaking automático
- ✅ Code Splitting por rutas
- ✅ Lazy Loading de componentes
- ✅ Compresión de assets
- ✅ Minificación de CSS/JS
- ✅ Optimización de imágenes

## 🌐 Deployment

### Netlify (Recomendado)

```bash
# Build para producción
npm run build:netlify

# El directorio dist/ está listo para deployment
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📋 Roadmap

### Próximas Mejoras

- [ ] **Blog Integration**: Sección de artículos técnicos
- [ ] **Testimonios**: Sección de recomendaciones
- [ ] **Analytics**: Integración con Google Analytics
- [ ] **Animations**: Más micro-animaciones con GSAP
- [ ] **i18n**: Soporte multiidioma (ES/EN)
- [ ] **CMS**: Integración con Headless CMS

### Features Avanzadas

- [ ] **3D Elements**: Integración con Three.js
- [ ] **Voice Navigation**: Navegación por voz
- [ ] **AI Chatbot**: Asistente virtual personal
- [ ] **Real-time Chat**: Chat en tiempo real

## 📧 Contacto Profesional

**Camilo Silva**

- 💼 **LinkedIn**: [linkedin.com/in/camilo-silva](https://linkedin.com/in/camilo-silva)
- 🐙 **GitHub**: [github.com/Camilo-Silva](https://github.com/Camilo-Silva)
- 📧 **Email**: [contacto@camilosilva.dev](mailto:contacto@camilosilva.dev)
- 🌐 **Portfolio**: [camilosilva.dev](https://camilosilva.dev)

---

<div align="center">

**⭐ Si te gusta este proyecto, considera darle una estrella en GitHub ⭐**

*Desarrollado con ❤️ y mucho ☕ por Camilo Silva*

</div>

## 🔧 Desarrollo y Customización

### Variables CSS Principales

```scss
// Colores principales
--primary-bg: #ffffff / #1a1a1a;
--secondary-bg: #f8f9fa / #2d2d2d;
--text-primary: #333333 / #ffffff;
--accent-color: #ff8a00 / #4a9eff;

// Espaciado
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;

// Breakpoints
--mobile: 768px;
--tablet: 1024px;
--desktop: 1200px;
```

### Estructura de Servicios

```typescript
// ThemeService - Gestión de temas
interface ThemeService {
  theme$: Observable<'light' | 'dark'>;
  toggleTheme(): void;
  setTheme(theme: 'light' | 'dark'): void;
}

// ProjectsService - Gestión de proyectos
interface ProjectsService {
  projects$: Observable<Project[]>;
  getProject(id: string): Observable<Project>;
  filterProjects(category: string): Observable<Project[]>;
}
```
