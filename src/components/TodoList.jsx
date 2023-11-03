import React from 'react';
import { Typography, List, Paper } from '@mui/material';
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todoList,
  toggleTodoListItemStatus,
  deleteTodoListItem,
  title,
  as
}) => {
  return (
    <>
      {todoList.length !== 0 && (
        <Paper 
          elevation={5} 
          style={{ 
          padding: '16px', 
          marginTop: '16px',
          backgroundColor: 'rgb(212 230 247)',
          color: '#1976d2'
        }}>
          <Typography variant="h5" component={as} style={{ marginBottom: '16px' }}>
            {title}
          </Typography>
          <List>
            {todoList.map((todo) => (
              <Paper elevation={0} style={{ padding: '5px', border: '1px solid #ccc', marginBottom: '10px' }} key={todo.id}>
                <TodoItem
                  todo={todo}
                  toggleTodoListItemStatus={toggleTodoListItemStatus}
                  deleteTodoListItem={deleteTodoListItem}
                />
              </Paper>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};
