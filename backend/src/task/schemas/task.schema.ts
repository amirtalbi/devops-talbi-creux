import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @ApiProperty({ description: 'Title of the task' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'Project ID associated with the task',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @ApiProperty({
    description: 'User ID assigned to the task',
    type: String,
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: Types.ObjectId;

  @ApiProperty({
    description: 'Tags associated with the task',
    type: [String],
    required: false,
  })
  @Prop([String])
  tags: string[];

  @ApiProperty({
    description: 'Priority of the task',
    enum: ['Low', 'Medium', 'High'],
  })
  @Prop({ enum: ['Low', 'Medium', 'High'] })
  priority: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: ['Open', 'In Progress', 'Completed'],
  })
  @Prop({ enum: ['Open', 'In Progress', 'Completed'] })
  status: string;

  @ApiProperty({
    description: 'Due date of the task',
    type: String,
    format: 'date-time',
  })
  @Prop()
  dueDate: Date;

  @ApiProperty({ description: 'Parent task ID', type: String, required: false })
  @Prop({ type: Types.ObjectId, ref: 'Task' })
  parent: Types.ObjectId;

  @ApiProperty({
    description: 'Subtasks associated with the task',
    type: [String],
    required: false,
  })
  @Prop({ type: [Types.ObjectId], ref: 'Task' })
  children?: Task[];

  @ApiProperty({ description: 'Creation date of the task', readOnly: true })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the task', readOnly: true })
  @Prop({ default: Date.now })
  updatedAt: Date;
  _id: any;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
