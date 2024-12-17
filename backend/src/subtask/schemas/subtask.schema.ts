import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SubtaskDocument = Subtask & Document;

@Schema({ timestamps: true })
export class Subtask {
  @ApiProperty({ description: 'Title of the subtask' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Task ID associated with the subtask', type: String })
  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  taskId: Types.ObjectId;

  @ApiProperty({ description: 'Status of the subtask', enum: ['Open', 'In Progress', 'Completed'] })
  @Prop({ enum: ['Open', 'In Progress', 'Completed'] })
  status: string;

  @ApiProperty({ description: 'Due date of the subtask', type: String, format: 'date-time' })
  @Prop()
  dueDate: Date;

  @ApiProperty({ description: 'Creation date of the subtask', readOnly: true })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the subtask', readOnly: true })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);