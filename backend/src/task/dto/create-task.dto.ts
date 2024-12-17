import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  description?: string;

  @ApiProperty({ description: 'Project ID associated with the task', type: String })
  projectId: Types.ObjectId;

  @ApiProperty({ description: 'User ID assigned to the task', type: String, required: false })
  assignedTo?: Types.ObjectId;

  @ApiProperty({ description: 'Tags associated with the task', type: [String], required: false })
  tags?: string[];

  @ApiProperty({ description: 'Priority of the task', enum: ['Low', 'Medium', 'High'] })
  priority: string;

  @ApiProperty({ description: 'Status of the task', enum: ['Open', 'In Progress', 'Completed'] })
  status: string;

  @ApiProperty({ description: 'Due date of the task', type: String, format: 'date-time' })
  dueDate?: Date;
}
