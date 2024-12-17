import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subtask, SubtaskDocument } from './schemas/subtask.schema';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectModel(Subtask.name) private subtaskModel: Model<SubtaskDocument>,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    const createdSubtask = new this.subtaskModel(createSubtaskDto);
    return createdSubtask.save();
  }

  async findAll(): Promise<Subtask[]> {
    return this.subtaskModel.find().exec();
  }

  async findByTask(taskId: string): Promise<Subtask[]> {
    return this.subtaskModel.find({ taskId }).exec();
  }

  async findOne(id: string): Promise<Subtask> {
    const subtask = await this.subtaskModel.findById(id).exec();
    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found`);
    }
    return subtask;
  }

  async update(
    id: string,
    updateSubtaskDto: UpdateSubtaskDto,
  ): Promise<Subtask> {
    const updatedSubtask = await this.subtaskModel
      .findByIdAndUpdate(id, updateSubtaskDto, { new: true })
      .exec();
    if (!updatedSubtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found`);
    }
    return updatedSubtask;
  }

  async remove(id: string): Promise<Subtask> {
    const deletedSubtask = await this.subtaskModel.findByIdAndDelete(id).exec();
    if (!deletedSubtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found`);
    }
    return deletedSubtask;
  }
}
