import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import {TodoAdd} from "./TodoAdd";
import { TodoList } from "./TodoList";
import { Container } from "@mui/material";

function App() {

  const {
    todoList,
    addTodoListItem, // 新規TODOを追加
    toggleTodoListItemStatus, // doneを反転・更新
    deleteTodoListItem // TODOを削除
    } = useTodo();

  // useRef で ref オブジェクトを作成
  const inputEl = useRef(null);

  // 新しいTODOに登録する関数
  const handleAddTodoListItem = () => {
    // 何も入力されていない場合は処理をスキップ
    if(inputEl.current.value === "") return;
    // テキストエリアに入力されたテキストを新規TODOとして追加
    addTodoListItem(inputEl.current.value);
    // 追加したら、テキストエリアを空の文字列にする
    inputEl.current.value = "";
  };

  // コンソールに取得したTODOリストの情報を表示
  console.log("TODOリスト:",todoList);

  // filter() を利用して「TODOの状態が未完了」の要素を持つ新しい配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  // filter() を利用して「TODOが完了」の要素を持つ新しい配列を表示
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return (
    <>
      <Container maxWidth="md">
        <TodoTitle title="TODO進捗管理" as="h1" />
        <TodoAdd 
          buttonText= "+ TODOを追加"
          inputEl={inputEl} 
          handleAddTodoListItem={handleAddTodoListItem} 
        />
        <TodoList 
          title="未完了TODOリスト"
          as="h2"
          todoList={inCompletedList} 
          toggleTodoListItemStatus={toggleTodoListItemStatus}
          deleteTodoListItem={deleteTodoListItem} 
        />
        <TodoList 
          title="完了TODOリスト"
          as="h2"
          todoList={completedList} 
          toggleTodoListItemStatus={toggleTodoListItemStatus}
          deleteTodoListItem={deleteTodoListItem} 
        />
      </Container>
    </>
  );
}

export default App;
