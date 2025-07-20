import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoInput } from './dtos/create-todo.input';
import { UpdateTodoInput } from './dtos/update-todo.input';


@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
  ) {}
  async create(input: CreateTodoInput): Promise<Todo> {
    const createdTodo = new this.todoModel(input);
    return createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const updated = await this.todoModel.findByIdAndUpdate(id, input, { new: true }).exec();
    if (!updated) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return updated;
  }
  
  async delete(id: string): Promise<Todo> {
    const deleted = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new Error(`Todo with id "${id}" not found`);
    }
    return deleted;
  }


}
