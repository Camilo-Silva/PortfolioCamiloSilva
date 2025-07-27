import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService, Project } from '../../services/projects.service';
import { ProjectListComponent } from '../../projects/project-list/project-list.component';
import { ProjectModalComponent } from '../../projects/project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, ProjectModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  hoveredProject: Project | null = null;
  selectedProject: Project | null = null;
  isModalOpen = false;
  private destroy$ = new Subject<void>();

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProjectHover(project: Project | null): void {
    this.hoveredProject = project;
  }

  onProjectClick(project: Project): void {
    this.selectedProject = project;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProject = null;
  }
}
