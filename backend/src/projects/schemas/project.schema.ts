import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @ApiProperty({ description: 'Name of the project' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Description of the project', required: false })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'Task list associated with the project',
    type: [String],
    required: false,
  })
  @Prop({ type: [Types.ObjectId], ref: 'Task' })
  tasks: Types.ObjectId[];

  @ApiProperty({ description: 'Owner ID of the project', type: String })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @ApiProperty({
    description: 'Members of the project',
    type: [String],
    required: false,
  })
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  members: Types.ObjectId[];

  @ApiProperty({ description: 'Creation date of the project', readOnly: true })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of the project',
    readOnly: true,
  })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
