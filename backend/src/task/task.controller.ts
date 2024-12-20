import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectIdValidationPipe } from '../common/pipes/object-id-validation.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Task } from './schemas/task.schema';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  @ApiResponse({
    status: 201,
    description: 'La tâche a été créée avec succès.',
    type: Task,
  })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  @ApiResponse({ status: 200, description: 'Liste des tâches.', type: [Task] })
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  @ApiResponse({ status: 200, description: 'Tâche trouvée.', type: Task })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche par ID' })
  @ApiResponse({
    status: 200,
    description: 'La tâche a été mise à jour avec succès.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @ApiBody({ type: UpdateTaskDto })
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche par ID' })
  @ApiResponse({
    status: 200,
    description: 'La tâche a été supprimée avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  async remove(@Param('id', ObjectIdValidationPipe) id: string): Promise<Task> {
    return this.taskService.remove(id);
  }
}
