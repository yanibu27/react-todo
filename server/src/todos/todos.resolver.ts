import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Todo } from './schemas/todo.schema';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dtos/create-todo.input';
import { UpdateTodoInput } from './dtos/update-todo.input';
import { ID } from '@nestjs/graphql';


@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  async todos(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Promise<Todo> {
    return this.todosService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Promise<Todo> {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
    return this.todosService.delete(id);
  }
  



}