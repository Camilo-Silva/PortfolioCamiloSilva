import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  videos?: string[]; // URLs de videos (Google Drive, YouTube, etc.)
  imagenes: string[];
  tecnologias: string[];
  githubUrl: string;
  hostedUrl: string;
  thumbnailUrl: string;
  hasFlowDetails?: boolean; // Indica si el proyecto tiene detalles de flujo
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>(this.getInitialProjects());
  public projects$ = this.projectsSubject.asObservable();

  constructor() { }

  // Helper para convertir URL de Google Drive a formato embebido
  convertGoogleDriveUrl(url: string): string {
    // Limpiar parámetros adicionales de la URL
    const cleanUrl = url.split('?')[0];

    // Convertir de https://drive.google.com/file/d/ID/view a formato embebido
    const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url; // Si no es formato Google Drive, devolver URL original
  }

  private getInitialProjects(): Project[] {
    return [
      {
        id: '1',
        nombre: 'Sublisa',
        descripcion: 'Tienda online especializada en el rubro de la sublimación. Ofrece una amplia gama de productos que incluyen artículos sublimables e insumos para profesionales, así como opciones de artículos personalizados y tecnología DTF. El proyecto está diseñado para que los usuarios puedan explorar fácilmente el catálogo, visualizar los productos y agregar los elementos deseados a un carrito de compras para finalizar su pedido de manera eficiente.',
        descripcionCorta: 'Tienda online especializada en sublimación que vende artículos sublimables, insumos para profesionales y productos personalizados (DTF), con carrito de compras para finalizar pedidos.',
        videos: [
          'https://drive.google.com/file/d/1idfxgHcMyvl4N39SzQHFHHNH3RovnNmr/view?usp=sharing'
        ],
        imagenes: [
          '/assets/images/project5-1.jpg',
          '/assets/images/project5-2.jpg',
          '/assets/images/project5-3.jpg'
        ],
        tecnologias: ['Angular', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'API REST', 'Supabase', 'PostgreSQL'],
        githubUrl: 'https://github.com/Camilo-Silva/Sublisa.git',
        hostedUrl: 'https://sublisa.netlify.app/',
        thumbnailUrl: '/assets/images/project5.png'
      },
      {
        id: '2',
        nombre: 'Way Combat',
        descripcion: 'Desarrollada como una plataforma web robusta para el fitness de combate. El backend fue implementado con ASP.NET Core, manejando eficientemente el registro de usuarios y la distribución de los mixes de entrenamiento. El frontend, creado con Angular, proporciona una experiencia de usuario fluida y reactiva para navegar y disfrutar de las rutinas.',
        descripcionCorta: 'Aplicación web de fitness de combate, donde usuarios pueden adquirir una variedad de mixes de entrenamiento.',
        videos: [
          'https://drive.google.com/file/d/1tCO456HFhG2kv_CD8Fs8RawcNT2NAGo5/view?usp=sharing'
        ],
        imagenes: [
          '/assets/images/project4-1.jpg',
          '/assets/images/project4-2.jpg',
          '/assets/images/project4-3.jpg'
        ],
        tecnologias: ['Angular', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'API REST', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server'],
        githubUrl: 'https://github.com/Camilo-Silva/WayCombat.git',
        hostedUrl: 'https://way-combat.netlify.app/',
        thumbnailUrl: '/assets/images/project4.png'
      },
      {
        id: '3',
        nombre: 'Spotify Clon',
        descripcion: 'Este proyecto es un clon de Spotify desarrollado con Angular 17.3, que implementa un reproductor de música, gestión de usuarios, historial, favoritos y navegación modular. El objetivo es practicar arquitectura escalable, buenas prácticas y el uso de Angular moderno (standalone components, directivas y pipes. Integración con API deployada en https://api-reproductormusica-production.up.railway.app/ ).',
        descripcionCorta: 'Clon de Spotify con Angular 17.3. Reproductor de música con gestión de usuarios, favoritos e historial.',
        videos: [
          'https://drive.google.com/file/d/1P3iIVv51_hI7S_4CI4pojN5PoWZnADmc/view?usp=sharing'
        ],
        imagenes: [
          '/assets/images/project1-1.jpg',
          '/assets/images/project1-2.jpg',
          '/assets/images/project1-3.jpg'
        ],
        tecnologias: ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Angular Router', 'API REST'],
        githubUrl: 'https://github.com/Camilo-Silva/AppReproductorMusica.git',
        hostedUrl: 'https://spotify-clon-camilo-silva.netlify.app/',
        thumbnailUrl: '/assets/images/project1.png'
      },
      {
        id: '4',
        nombre: 'App de Gestión de Turnos',
        descripcion: 'es un sistema integral de gestión de turnos médicos desarrollado con ASP.NET Core 8.0 MVC. La aplicación facilita la administración de citas médicas, permitiendo la gestión de pacientes, médicos, especialidades, turnos y historiales médicos de manera eficiente y centralizada.',
        descripcionCorta: 'Sistema de gestión de turnos médicos con ASP.NET Core. Administración completa de citas y pacientes.',
        videos: [
          'https://drive.google.com/file/d/1Hg3jxrDwXmmD1Gp6npi6N83S74ji31YX/view?usp=sharing'
        ],
        imagenes: [
          '/assets/images/project2-1.jpg',
          '/assets/images/project2-2.jpg',
          '/assets/images/project2-3.jpg'
        ],
        tecnologias: ['ASP.NET Core', 'PostgreSQL (Railway)', 'Entity Framework Core', 'ASP.NET Core Identity', 'MVC con Razor Views', 'Docker'],
        githubUrl: 'https://github.com/Camilo-Silva/TurnoSmart',
        hostedUrl: 'https://turnosmart-production.up.railway.app/',
        thumbnailUrl: '/assets/images/project2.png',
        hasFlowDetails: true // Este proyecto tiene detalles de flujo de app
      },
      {
        id: '5',
        nombre: 'Calculadora Python',
        descripcion: 'Una calculadora web moderna y funcional desarrollada con Python Flask que incluye: Calculadora Básica: Operaciones aritméticas fundamentales - Calculadora Científica: Funciones matemáticas avanzadas - Operaciones con Listas: Cálculos con múltiples números - Interfaz Moderna: Diseño responsivo y atractivo - Historial: Registro de todos los cálculos realizados - Soporte de Teclado: Navega usando el teclado',
        descripcionCorta: 'Calculadora web moderna con Python Flask. Funciones básicas, científicas y historial de cálculos.',
        videos: [
          'https://drive.google.com/file/d/1MXfqPyzFrERNddvFfs_WSaBFfJMszziB/view?usp=sharing'
        ],
        imagenes: [
          '/assets/images/project3-1.jpg',
          '/assets/images/project3-2.jpg',
          '/assets/images/project3-3.jpg'
        ],
        tecnologias: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'API REST', 'Railway'],
        githubUrl: 'https://github.com/Camilo-Silva/CalculadoraPython.git',
        hostedUrl: 'https://calculadorapython-production.up.railway.app/',
        thumbnailUrl: '/assets/images/project3.png'
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
