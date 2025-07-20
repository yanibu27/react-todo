import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoList from './components/todoList.tsx';
import { Provider } from 'urql';
import { client } from './lib/urqlClient';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider value={client}>
      <TodoList />
    </Provider>
  </StrictMode>,
)
