import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  imagenes: string[];
  tecnologias: string[];
  githubUrl: string;
  hostedUrl: string;
  thumbnailUrl: string;
  flujoApp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>(this.getInitialProjects());
  public projects$ = this.projectsSubject.asObservable();

  constructor() { }

  private getInitialProjects(): Project[] {
    return [
      {
        id: '1',
        nombre: 'Spotify Clon',
        descripcion: 'Este proyecto es un clon de Spotify desarrollado con Angular 17.3, que implementa un reproductor de música, gestión de usuarios, historial, favoritos y navegación modular. El objetivo es practicar arquitectura escalable, buenas prácticas y el uso de Angular moderno (standalone components, directivas y pipes).',
        imagenes: [
          '/assets/images/project1-1.jpg',
          '/assets/images/project1-2.jpg',
          '/assets/images/project1-3.jpg'
        ],
        tecnologias: ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Angular Router'],
        githubUrl: 'https://github.com/Camilo-Silva/AppReproductorMusica.git',
        hostedUrl: 'https://spotify-clon-camilo-silva.netlify.app/',
        thumbnailUrl: '/assets/images/project1.jpg'
      },
      {
        id: '2',
        nombre: 'Sistema de Gestión de Turnos',
        descripcion: 'es un sistema integral de gestión de turnos médicos desarrollado con ASP.NET Core 8.0 MVC. La aplicación facilita la administración de citas médicas, permitiendo la gestión de pacientes, médicos, especialidades, turnos y historiales médicos de manera eficiente y centralizada.',
        imagenes: [
          '/assets/images/project2-1.jpg',
          '/assets/images/project2-2.jpg',
          '/assets/images/project2-3.jpg'
        ],
        tecnologias: ['ASP.NET Core', 'PostgreSQL (Railway)', 'Entity Framework Core', 'ASP.NET Core Identity', 'MVC con Razor Views', 'Docker'],
        githubUrl: 'https://github.com/Camilo-Silva/TurnoSmart',
        hostedUrl: 'https://turnosmart-production.up.railway.app/',
        thumbnailUrl: '/assets/images/project2.jpg',
        flujoApp: `## 🔐 Usuarios de Prueba

### 👨‍💼 Administrador
- **Email**: admin@turno-smart.com.ar
- **Password**: Admin123!
- **Rol**: Administrador completo del sistema

### 👤 Paciente de Prueba
- **Email**: paciente15@turno-smart.com.ar
- **Password**: cualquiera1
- **Rol**: Paciente registrado

### ⚕️ Médico de Prueba
- **Email**: medico1@turno-smart.com.ar
- **Password**: NuevoMedic0!
- **Rol**: Médico con especialidad

### 👩‍💼 Recepcionista de Prueba
- **Email**: recepcion1@turno-smart.com.ar
- **Password**: Recep123!
- **Rol**: Recepcionista del centro médico

---

## 🚀 Flujo de la Aplicación

### 1. 👨‍💼 Como Administrador

**Iniciar Sesión:**
1. Ir a la página principal
2. Hacer clic en "Iniciar Sesión"
3. Ingresar credenciales de administrador
4. Acceder al panel completo

**Funcionalidades del Admin:**
- ✅ **Ver Dashboard**: Resumen general del sistema
- ✅ **Gestión de Médicos**: Ver, crear, editar y eliminar médicos
- ✅ **Gestión de Pacientes**: Administrar base de pacientes
- ✅ **Especialidades**: Gestionar especialidades médicas
- ✅ **Turnos**: Ver y gestionar todos los turnos del sistema
- ✅ **Historiales Médicos**: Acceso completo a historiales

**Navegación Admin:**
Navbar → Médicos → Ver lista de médicos registrados
Navbar → Pacientes → Ver pacientes dados de alta
Navbar → Especialidades → Gestionar especialidades
Navbar → Turnos → Ver agenda completa

---

### 2. 👤 Como Paciente

#### Opción A: Usar Paciente Existente
1. **Iniciar Sesión** con paciente15@turno-smart.com.ar
2. **Ver Perfil**: Datos personales completos
3. **Reservar Turno**: Navegar por especialidades y médicos

#### Opción B: Registrar Nuevo Paciente
1. **Registro**: Hacer clic en "Registrarse"
2. **Completar Formulario**:
   - Nombre y apellido
   - DNI único
   - Email
   - Fecha de nacimiento
   - Contraseña
   - ✅ Aceptar términos
3. **Confirmación**: Sistema crea usuario automáticamente

**Funcionalidades del Paciente:**
- ✅ **Mi Perfil**: Ver y editar datos personales
- ✅ **Reservar Turnos**: Buscar por especialidad o médico
- ✅ **Mis Turnos**: Ver turnos reservados
- ✅ **Cambiar Contraseña**: Gestión de cuenta

**Flujo de Reserva de Turno:**
1. Especialidades → Seleccionar especialidad
2. Médicos → Elegir profesional
3. Horarios → Seleccionar fecha y hora disponible
4. Confirmar → Turno reservado

---

### 3. ⚕️ Como Médico

**Iniciar Sesión:**
1. Usar credenciales: medico1@turno-smart.com.ar
2. Acceder al panel médico

**Funcionalidades del Médico:**
- ✅ **Mi Agenda**: Ver turnos del día/semana
- ✅ **Historiales Médicos**: Crear y gestionar historiales
- ✅ **Pacientes**: Ver lista de pacientes asignados
- ✅ **Turnos**: Confirmar y gestionar citas

**Gestión de Historiales:**
1. Turnos → Seleccionar paciente
2. Historial Médico → Crear nuevo
3. Completar:
   - Síntomas
   - Diagnóstico
   - Tratamiento
   - Prescripciones
   - Notas adicionales
4. Guardar historial

---

### 4. 👩‍💼 Como Recepcionista

**Iniciar Sesión:**
1. Usar credenciales: recepcion1@turno-smart.com.ar
2. Acceder al panel de recepción

**Funcionalidades de la Recepcionista:**
- ✅ **Gestión de Pacientes**: Registrar, editar y administrar pacientes
- ✅ **Confirmar Agenda Médica**: Verificar y confirmar turnos de médicos
- ✅ **Turnos**: Ver y gestionar la agenda general
- ✅ **Atención al Paciente**: Primera línea de contacto

**Flujo de Trabajo Recepcionista:**
1. Gestión de Pacientes:
   - Registrar nuevos pacientes
   - Actualizar datos existentes
   - Verificar información de contacto

2. Confirmación de Agenda:
   - Revisar turnos programados
   - Confirmar disponibilidad médica
   - Coordinar horarios y especialidades

3. Atención y Seguimiento:
   - Recibir consultas de pacientes
   - Gestionar cambios de turno
   - Coordinar con médicos`
      },
      {
        id: '3',
        nombre: 'E-commerce Platform',
        descripcion: 'Aplicación web de portafolio profesional desarrollada con Angular 18+, featuring routing, tema claro/oscuro, diseño responsivo y arquitectura de componentes moderna.',
        imagenes: [
          '/assets/images/project3-1.jpg',
          '/assets/images/project3-2.jpg',
          '/assets/images/project3-3.jpg'
        ],
        tecnologias: ['React', 'Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
        githubUrl: 'https://github.com/camilosilva/ecommerce-platform',
        hostedUrl: 'https://ecommerce-platform-demo.vercel.app',
        thumbnailUrl: '/assets/images/project3.jpg'
      }
    ];
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return new Observable(observer => {
      const project = this.projectsSubject.value.find(p => p.id === id);
      observer.next(project);
      observer.complete();
    });
  }

  addProject(project: Omit<Project, 'id'>): void {
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    const currentProjects = this.projectsSubject.value;
    this.projectsSubject.next([...currentProjects, newProject]);
  }

  updateProject(id: string, updatedProject: Partial<Project>): void {
    const currentProjects = this.projectsSubject.value;
    const index = currentProjects.findIndex(p => p.id === id);
    
    if (index !== -1) {
      currentProjects[index] = { ...currentProjects[index], ...updatedProject };
      this.projectsSubject.next([...currentProjects]);
    }
  }

  deleteProject(id: string): void {
    const currentProjects = this.projectsSubject.value;
    const filteredProjects = currentProjects.filter(p => p.id !== id);
    this.projectsSubject.next(filteredProjects);
  }
}
