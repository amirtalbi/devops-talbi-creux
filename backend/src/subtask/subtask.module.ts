import { Module } from '@nestjs/common';
import { SubtaskController } from './subtask.controller';
import { SubtaskService } from './subtask.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtask, SubtaskSchema } from './schemas/subtask.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subtask.name, schema: SubtaskSchema }]),
  ],
  controllers: [SubtaskController],
  providers: [SubtaskService]
})
export class SubtaskModule {}
