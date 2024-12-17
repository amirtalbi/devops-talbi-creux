import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private selectedProject: { id: string, name: string };
  constructor() { }
  
  setSelectedProject(id:string,name:string) {
    this.selectedProject = { id, name };
  }

  getSelectedProject(): { id: string, name: string } {
    return this.selectedProject;
    }
}
