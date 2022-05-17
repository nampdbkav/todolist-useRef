import React from 'react';

//Component
import TodoList from './components/TodoList';
import { ThemeProvider } from './components/ThemeContext'

//Css
import './css/Todo.css'


function App(props) {

  return (
    <ThemeProvider>
      <TodoList />
    </ThemeProvider>
  );
}

export default App;