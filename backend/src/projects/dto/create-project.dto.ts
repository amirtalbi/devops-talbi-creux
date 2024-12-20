import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Name of the project' })
  @IsNotEmpty({ message: 'Le nom du projet est requis.' })
  @IsString({ message: 'Le nom du projet doit être une chaîne de caractères.' })
  name: string;

  @ApiProperty({ description: 'Description of the project', required: false })
  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  description?: string;

  @ApiProperty({
    description: 'Task list associated with the project',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'La liste des tâches doit être un tableau.' })
  tasks?: Types.ObjectId[];

  @ApiProperty({ description: 'Owner ID of the project', type: String })
  @IsNotEmpty({ message: "L'ID du propriétaire est requis." })
  ownerId: Types.ObjectId;

  @ApiProperty({
    description: 'Members of the project',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'La liste des membres doit être un tableau.' })
  members?: Types.ObjectId[];
}
