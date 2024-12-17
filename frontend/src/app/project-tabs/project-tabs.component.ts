import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Priority, Project, TaskStatus, TaskType } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrl: './project-tabs.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectTabsComponent implements OnInit, OnDestroy {
  public TaskStatus = TaskStatus;

  public currentSelectedFilter = null;

  public Priority = Priority;
  public TaskType = TaskType;

  public searchTerm = '';

  public disabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.selectedProject$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((project) => {
        if (project) {
          this.disabled$.next(true);
        } else {
          this.disabled$.next(false);
        }
      });
  }

  public getIconByTaskType(type: TaskType): string {
    return this.taskService.getIconByTaskType(type);
  }

  public getIconByPriority(priority: Priority): string {
    return this.taskService.getIconByPriority(priority);
  }

  public onFilterChange(filter: Priority | TaskType): void {
    const project = this.taskService.selectedProject;
    if (typeof filter === 'string') {
      this.filterTasksByType(project, filter);
    } else if (typeof filter === 'number') {
      this.filterTasksByPriority(project, filter);
    } else {
      this.taskService.projectTaskFiltered = project;
    }
  }

  private filterTasksByPriority(project: Project, priority: Priority): void {
    const filteredTasks = project.tasks.filter(
      (task) => task.priority === priority
    );
    this.taskService.projectTaskFiltered = {
      ...project,
      tasks: filteredTasks,
    };
  }

  private filterTasksByType(project: Project, type: TaskType): void {
    const filteredTasks = project.tasks.filter((task) => task.type === type);
    this.taskService.projectTaskFiltered = {
      ...project,
      tasks: filteredTasks,
    };
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
