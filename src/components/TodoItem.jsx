import React from 'react';
import { ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {

  const handleToggleTodoListItemStatus = () => {
    toggleTodoListItemStatus(todo.id, todo.done);
  };

  const handleDeleteTodoListItem = () => {
    deleteTodoListItem(todo.id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDeleteTodoListItem}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={
          <Typography component="div" variant="body1" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.content}
          </Typography>
        }
      />
      <IconButton onClick={handleToggleTodoListItemStatus}>
        {todo.done ? <CheckCircleOutlineIcon color="success"/> : <RadioButtonUncheckedIcon />}
      </IconButton>
    </ListItem>
  );
};
