import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'Username of the user' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ description: 'Email of the user' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Creation date of the user', readOnly: true })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the user', readOnly: true })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
