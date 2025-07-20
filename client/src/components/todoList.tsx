import { useQuery, useMutation } from 'urql';
import type { Todo } from "../types/todo";
import TodoItem from "./todoItem.tsx";
import AddTodo from "./addTodo.tsx";
import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "../graphql/queries.ts";


export default function TodoList() {
    const [queryResult] = useQuery({ query: GET_TODOS });
    const [, createTodo] = useMutation(CREATE_TODO);
    const [, updateTodo] = useMutation(UPDATE_TODO);
    const [, deleteTodo] = useMutation(DELETE_TODO);

    const { data, fetching, error } = queryResult;
    const todos = data?.todos || [];

    const handleAddTodo = async (title: string) => {
      try {
        await createTodo({ createTodoInput: { title } });
      } catch (err) {
        console.error('Error creating todo:', err);
      }
    };
  
    const handleEdit = async (id: string, title: string, completed: boolean) => {
      try {
        await updateTodo({ updateTodoInput: { id, title, completed } });
      } catch (err) {
        console.error('Error updating todo:', err);
      }
    };
  
    const handleDelete = async (id: string) => {
      try {
        await deleteTodo({ id });
      } catch (err) {
        console.error('Error deleting todo:', err);
      }
    };
  
    if (fetching) return <div className="flex justify-center p-8 text-muted-foreground">Loading...</div>;
    if (error) return <div className="p-4 text-destructive bg-destructive/10 rounded-lg border border-destructive/20">Error: {error.message}</div>;

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <div className="mb-6">
          <AddTodo onAdd={handleAddTodo} />
        </div>
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map((todo: Todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    );
  }
  