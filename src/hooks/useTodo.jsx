import {useState,useEffect} from "react";
// 一意なidを生成する ulid を import
import { ulid } from "ulid";
import * as todoData from "../apis/todos"

export const useTodo = () => {

    const [todoList,setTodoList] = useState([]);

    useEffect(() => {
        // コンポーネントマウント後またはアンマウント後に
        // モックサーバーからTODOデータを取得する
        todoData.getAllTodosData().then((todo) => {
            // モックサーバーからデータを取得後、取得したTODOデータを反転
            // 新しい配列を作成し、todoListの状態を更新
            setTodoList([...todo].reverse());
        });
    },[]);

    // done(完了/未完了)の真偽値を反転させて更新する関数
    const toggleTodoListItemStatus = (id,done) => {
        // 配列から条件に合う値を見つけて、最初に true になった
        // 要素の値を返し、要素を見つけた時点で処理を停止する
        // doneの状態を反転させたい todoListItem の id を見つけ、
        // 条件に一致する todoItem を返す
        const todoItem = todoList.find((item) => item.id === id);

        // 現在の todoList の中から、条件に一致した要素である todoItemの
        // doneを反転させる
        const newTodoItem = {...todoItem, done: !done};

        // 指定された id のTODOを更新したら、続いて todoList の状態も更新する
        todoData.updateTodoData(id,newTodoItem).then((updateTodo) => {
            const newTodoList = todoList.map((item) => 
                // idが異なる場合、todoList から取り出した item をそのまま返し、
                // 同じ場合は doneの状態を反転させた updateTodo を
                // 返して新しい配列 newTodoList を作成
                item.id !== updateTodo.id ? item : updateTodo
            );

            // todoListの現在の状態(state)を newTodoListの内容に更新
            setTodoList(newTodoList);
        });
    };

    // 新規TODOを追加する関数
    const addTodoListItem = (todoContent) => {
        const newTodoItem = {
            // content は追加するTODOの内容
            content: todoContent,
            // idにulidで生成された一意な値をセット
            id: ulid(),
            // 追加されたTODOはデフォルトで未完了状態にセット
            done: false
        };

        // addTodoData() を利用してTODOを更新したら、
        // 続いて todoList の状態も更新
        // addTodoData() は新規TODOを追加する関数
        return todoData.addTodoData(newTodoItem).then((addTodo) => {
            // todoList の状態(state)を　 newTodoItem が追加された状態に更新
            setTodoList([addTodo,...todoList])
        });
    };

    // TODOを削除する関数を宣言
    const deleteTodoListItem = (id) => {
        // todoDataを更新したらtodoListの状態も更新
        // 指定されたidのTODOを削除したら、todoListの状態も更新する
        // 一致したidのTODOを削除する関数
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                // 削除したTODOと id が一致しないTODOをフィルタリングして
                // 新しい配列を返す
                // id が一致したTODOは除外される
                (item) => item.id !== deleteListItemId
            );
            // todoList の状態(state)を更新
            setTodoList(newTodoList);
        });
    };

    // 作成した関数を返す
    return {
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteTodoListItem
    };
};
