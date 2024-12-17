import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly notificationsService: NotificationsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    const task = await createdTask.save();

    await this.notificationsService.sendEmail(
      'destinataire@example.com',
      'Nouvelle tâche créée',
      `La tâche "${task.title}" a été créée.`,
    );

    this.notificationsGateway.notifyTaskAdded(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.notificationsService.sendEmail(
      'destinataire@example.com',
      'Statut de tâche mis à jour',
      `La tâche "${updatedTask.title}" a été mise à jour.`,
    );

    this.notificationsGateway.notifyTaskStatusChanged(updatedTask);
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return deletedTask;
  }

  async getTaskTree(projectId: Types.ObjectId): Promise<Task[]> {
    const tasks = await this.taskModel.find({ projectId }).exec();
    return this.buildTaskTree(tasks);
  }

  private buildTaskTree(tasks: Task[]): Task[] {
    const taskMap = new Map<string, Task>();

    tasks.forEach(task => {
      taskMap.set(task._id.toString(), task);
    });

    const taskTree: Task[] = [];

    tasks.forEach(task => {
      if (task.parent) {
        const parentTask = taskMap.get(task.parent.toString());
        if (parentTask) {
          if (!parentTask.children) {
            parentTask.children = [];
          }
          parentTask.children.push(task);
        }
      } else {
        taskTree.push(task);
      }
    });

    return taskTree;
  }
}
