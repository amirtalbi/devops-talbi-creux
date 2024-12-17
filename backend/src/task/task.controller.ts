import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { Types } from 'mongoose';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully.',
    type: Task,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully.',
    type: [Task],
  })
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task found.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.remove(id);
  }

  @Get('project/:projectId/tree')
  @ApiOperation({ summary: 'Get task tree by project ID' })
  @ApiResponse({
    status: 200,
    description: 'Task tree retrieved successfully.',
    type: [Task],
  })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  getTaskTree(@Param('projectId') projectId: string): Promise<Task[]> {
    return this.taskService.getTaskTree(new Types.ObjectId(projectId));
  }
}
