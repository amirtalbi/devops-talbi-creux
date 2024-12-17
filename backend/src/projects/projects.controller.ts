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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully.',
    type: Project,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved successfully.',
    type: [Project],
  })
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiResponse({ status: 200, description: 'Project found.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get projects by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved successfully.',
    type: [Project],
  })
  @ApiResponse({ status: 404, description: 'Projects not found.' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  findByUserId(@Param('userId') userId: string): Promise<Project[]> {
    return this.projectsService.findByUser(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully.',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully.',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  remove(@Param('id') id: string): Promise<Project> {
    return this.projectsService.remove(id);
  }
}
