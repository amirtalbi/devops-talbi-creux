import { Component } from '@angular/core';
import { ProjectService } from './project.service';

interface projet {
  id: number;
  name: string;
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  search = '';
  projects: projet[] = [];
  filteredProjects: projet[] = [];

  constructor(private projectService: ProjectService) {
    this.filteredProjects = this.projects;
  }

  createProject() {
    prompt('Entrez le nom du nouveau projet :');
  }

  deleteProject() {
    this.filterProjects();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }
  isProjectSelected(project: projet) {
    return this.projectService.getSelectedProject().name === project.name;
  }
}
