import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import {TodoAdd} from "./TodoAdd";
import { TodoList } from "./TodoList";
import { Container } from "@mui/material";

function App() {
  // useTodo()カスタムフックで作成した todoList を利用できるようにする
  // todoListは現在のTODOの状態
  const {
    todoList,
    addTodoListItem, // 新規TODOを追加する関数
    toggleTodoListItemStatus, // done(完了/未完了)を反転させて更新する関数
    deleteTodoListItem // TODOを削除する関数
    } = useTodo();

  // useRef で ref オブジェクトを作成(TODO入力フォームで利用)
  const inputEl = useRef(null);

  // TODO入力フォームで入力された文字列を新しいTODOに登録するための
  // 関数を宣言
  const handleAddTodoListItem = () => {
    // 何も入力されていない場合にクリックしても何も返さない
    if(inputEl.current.value === "") return;

    // テキストエリアに入力されたテキストを新規TODOとして追加
    // 追加したら、テキストエリアを空の文字列にする
    // 新規TODOを追加する addTodoListItem関数を
    // 「+ TODOを追加」ボタンをクリックで実行
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  // console.logでコンソールに取得したTODOリストの情報を表示してみる
  console.log("TODOリスト:",todoList);

  // filter() を利用して「TODOの状態が未完了」の要素を持つ新しい配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  // filter() を利用して「TODOが完了」の要素を持つ新しい配列を表示してみる
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
