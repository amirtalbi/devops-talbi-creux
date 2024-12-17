import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Project } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Jirar';
  showNavbar = true;
  isModalVisible = false;

  constructor(
    private readonly router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    public taskService: TaskService
  ) {
    router.events.subscribe(() => {
      if (router.url.includes('login') || router.url.includes('register')) {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }

  public updateSelectedProject(project: Project): void {
    this.taskService.selectedProject = project;
    this.taskService.projectTaskFiltered = project;
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  createComponentModal(): void {
    this.modal.create<CreateTaskComponent>({
      nzContent: CreateTaskComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '80%',
      nzFooter: null,
    });
  }
}
