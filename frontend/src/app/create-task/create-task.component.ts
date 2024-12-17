import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  task = {
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    type:'',
    tags: [] as string[],
    tagsString: '',
    priority: 'Low',
    status: 'Open',
    dueDate: ''
  };

  constructor(private taskService: TaskService) {}

  assignToMe(): void { 
    this.task.assignedTo = 'Me';
  }
  clearAssignation() {
    this.task.assignedTo = '';
  }
  setStatus(status: string): void {
    this.task.status = status;
  }

  updateTags(): void {
    this.task.tags = this.task.tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
  }

  submit(): void {
    if (!this.task.title || !this.task.projectId) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    this.taskService.createTask(this.task).subscribe({
      next: (response) => {
        alert('Tâche créée avec succès !');
        console.log(response);
      },
      error: (error) => {
        alert('Erreur lors de la création de la tâche.');
        console.error(error);
      }
    });
  }
}
