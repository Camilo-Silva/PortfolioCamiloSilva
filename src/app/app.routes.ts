import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proyectos', component: ProjectsComponent },
  { path: 'acerca-de', component: AboutComponent },
  { path: 'contacto', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
