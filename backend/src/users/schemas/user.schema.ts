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

// Exclure le champ `password` lors de la conversion en JSON
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Assurez-vous que les index uniques sont correctement configurés
UserSchema.index({ email: 1, username: 1 }, { unique: true });
