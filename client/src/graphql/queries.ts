// src/graphql/todoQueries.ts

export const GET_TODOS = `
  query GetTodos {
    todos {
      _id
      title
      completed
    }
  }
`;

export const CREATE_TODO = `
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      _id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = `
  mutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $updateTodoInput) {
      _id
      title
      completed
    }
  }
`;

export const DELETE_TODO = `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
      title
      completed
    }
  }
`;
