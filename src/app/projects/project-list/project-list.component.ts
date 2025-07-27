import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
  @Output() projectHover = new EventEmitter<Project | null>();
  @Output() projectClick = new EventEmitter<Project>();

  onProjectHover(project: Project): void {
    this.projectHover.emit(project);
  }

  onProjectLeave(): void {
    this.projectHover.emit(null);
  }

  onProjectClick(project: Project): void {
    this.projectClick.emit(project);
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }
}
