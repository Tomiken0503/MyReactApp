import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

export const TodoAdd = ({ buttonText, inputEl, handleAddTodoListItem }) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" mb={2}>
      <Grid item xs={12}>
        {/* TextFieldを使用して入力欄を作成 */}
        <TextField
          inputRef={inputEl}
          label="新しいTODO"
          variant="outlined"
          multiline
          rows={2}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        {/* ボタンを押したときに handleAddTodoListItem を実行 */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodoListItem}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
};
