import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateSubtaskDto {
  @ApiProperty({ description: 'Title of the subtask' })
  title: string;

  @ApiProperty({
    description: 'Task ID associated with the subtask',
    type: String,
  })
  taskId: Types.ObjectId;

  @ApiProperty({
    description: 'Status of the subtask',
    enum: ['Open', 'In Progress', 'Completed'],
  })
  status: string;

  @ApiProperty({
    description: 'Due date of the subtask',
    type: String,
    format: 'date-time',
  })
  dueDate?: Date;
}
