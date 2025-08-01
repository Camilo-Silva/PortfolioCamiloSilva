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
        nombre: 'Sistema de Gestión',
        descripcion: 'Aplicación full-stack para gestión empresarial con autenticación, dashboard interactivo, manejo de usuarios y reportes en tiempo real.',
        imagenes: [
          '/assets/images/project2-1.jpg',
          '/assets/images/project2-2.jpg',
          '/assets/images/project2-3.jpg'
        ],
        tecnologias: ['Node.js', 'Express', 'MongoDB', 'Angular', 'JWT', 'Chart.js'],
        githubUrl: 'https://github.com/camilosilva/sistema-gestion',
        hostedUrl: 'https://sistema-gestion-demo.herokuapp.com',
        thumbnailUrl: '/assets/images/project2-thumb.jpg'
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
        thumbnailUrl: '/assets/images/project3-thumb.jpg'
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
