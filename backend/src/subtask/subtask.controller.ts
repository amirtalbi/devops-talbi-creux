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
import { SubtaskService } from './subtask.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Subtask } from './schemas/subtask.schema';

@Controller('subtasks')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subtask' })
  @ApiResponse({
    status: 201,
    description: 'Subtask created successfully.',
    type: Subtask,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    return this.subtaskService.create(createSubtaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subtasks' })
  @ApiResponse({
    status: 200,
    description: 'Subtasks retrieved successfully.',
    type: [Subtask],
  })
  findAll(): Promise<Subtask[]> {
    return this.subtaskService.findAll();
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Get subtasks by task ID' })
  @ApiResponse({
    status: 200,
    description: 'Subtasks retrieved successfully.',
    type: [Subtask],
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  findByTask(@Param('taskId') taskId: string): Promise<Subtask[]> {
    return this.subtaskService.findByTask(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subtask by ID' })
  @ApiResponse({ status: 200, description: 'Subtask found.', type: Subtask })
  @ApiResponse({ status: 404, description: 'Subtask not found.' })
  @ApiParam({ name: 'id', description: 'Subtask ID' })
  findOne(@Param('id') id: string): Promise<Subtask> {
    return this.subtaskService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subtask by ID' })
  @ApiResponse({
    status: 200,
    description: 'Subtask updated successfully.',
    type: Subtask,
  })
  @ApiResponse({ status: 404, description: 'Subtask not found.' })
  @ApiParam({ name: 'id', description: 'Subtask ID' })
  update(
    @Param('id') id: string,
    @Body() updateSubtaskDto: UpdateSubtaskDto,
  ): Promise<Subtask> {
    return this.subtaskService.update(id, updateSubtaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subtask by ID' })
  @ApiResponse({
    status: 200,
    description: 'Subtask deleted successfully.',
    type: Subtask,
  })
  @ApiResponse({ status: 404, description: 'Subtask not found.' })
  @ApiParam({ name: 'id', description: 'Subtask ID' })
  remove(@Param('id') id: string): Promise<Subtask> {
    return this.subtaskService.remove(id);
  }
}
