import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  Subject,
  takeUntil,
} from 'rxjs';
import { Priority, Task, TaskType } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public currentSelectedProject = null;
  public currentSelectedFilter = null;

  public Priority = Priority;
  public TaskType = TaskType;

  public searchTerm: string = '';

  private userId = 1; // replace it with userService

  public disabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public taskService: TaskService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.selectedProject$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        distinctUntilChanged(),
        filter((project) => project !== null)
      )
      .subscribe((project) => {
        this.currentSelectedProject = project.name;
        this.onProjectChange(project.id);
        this.ref.markForCheck();
      });
  }

  public onProjectChange(id: any): void {
    if (!id) {
      this.reset();
      return;
    }
    this.disabled$.next(true);
    const selectedProject = this.taskService.projects$
      .getValue()
      .find((project) => project.id === id);
    const selectedTaskByUser = this.getTaskByUserId(selectedProject.tasks);
    this.taskService.selectedProject = selectedProject;
    this.taskService.userSelectedTask = selectedTaskByUser;
    this.taskService.projectTaskFiltered = selectedProject;
  }

  public getIconByTaskType(type: TaskType): string {
    return this.taskService.getIconByTaskType(type);
  }

  public getIconByPriority(priority: Priority): string {
    return this.taskService.getIconByPriority(priority);
  }

  public onFilterChange(filter: Priority | TaskType): void {
    const fullUserTaskList = this.getTaskByUserId(
      this.taskService.selectedProject.tasks
    );
    if (typeof filter === 'string') {
      this.filterTasksByType(fullUserTaskList, filter);
    } else if (typeof filter === 'number') {
      this.filterTasksByPriority(fullUserTaskList, filter);
    } else {
      this.taskService.userSelectedTask = fullUserTaskList;
    }
  }

  private filterTasksByPriority(tasks: Task[], priority: Priority): void {
    this.taskService.userSelectedTask = tasks.filter(
      (task) => task.priority === priority
    );
  }

  private filterTasksByType(tasks: Task[], type: TaskType): void {
    this.taskService.userSelectedTask = tasks.filter(
      (task) => task.type === type
    );
  }

  private getTaskByUserId(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.assignedTo === this.userId);
  }

  private reset(): void {
    this.disabled$.next(false);
    this.taskService.selectedProject = null;
    this.taskService.projectTaskFiltered = null;
    this.taskService.userSelectedTask = [];
    this.currentSelectedProject = null;
    this.currentSelectedFilter = null;
    this.searchTerm = '';
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
