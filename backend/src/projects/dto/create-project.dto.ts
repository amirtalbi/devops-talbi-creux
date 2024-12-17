import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @ApiProperty({ description: 'Name of the project' })
  name: string;

  @ApiProperty({ description: 'Description of the project', required: false })
  description?: string;

  @ApiProperty({
    description: 'Task list associated with the project',
    type: [String],
    required: false,
  })
  tasks?: Types.ObjectId[];

  @ApiProperty({ description: 'Owner ID of the project', type: String })
  ownerId: Types.ObjectId;

  @ApiProperty({
    description: 'Members of the project',
    type: [String],
    required: false,
  })
  members?: Types.ObjectId[];
}
