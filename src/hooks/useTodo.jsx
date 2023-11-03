import {useState,useEffect} from "react";
// 一意なidを生成する ulid を import
import { ulid } from "ulid";
// src/apis/todos.js 内で宣言してexportしておいた関数を
// import することによりuseTodo.js内で利用できるようにする
// getAllTodosData, addTodoData, deleteTodoData, updateTodoData を
//  todoDataオブジェクトとしてまとめてimport
import * as todoData from "../apis/todos"

// useTodoカスタムフックを外部ファイルからアクセスできるようにするため
// exportしておく
export const useTodo = () => {
    // todolistは現在のTODOの状態
    // setTodoList は現在のtodoListの状態を更新するための関数
    // todoList の初期値に空の配列をセット
    const [todoList,setTodoList] = useState([]);

    useEffect(() => {
        // useEffect() を利用することによりコンポーネントマウント後
        // またはアンマウント後に処理を実行する
        // モックサーバーからTODOデータを取得する getAllTodosData() を実行
        todoData.getAllTodosData().then((todo) => {
            // モックサーバーからデータを取得後、取得したTODOデータを反転
            // させておくことで、TODOを追加した順に上から表示させることができる
            // Array.reverse()と、スプレット構文[ES2015]を組み合わせて
            // 並び替えを行うことで、もとの配列要素の並び順に影響することなく
            // 新しい配列を作成できる
            // todoListの状態を更新
            setTodoList([...todo].reverse());
        });
    },[]);

    // todoListItem の done(完了/未完了)の真偽値を反転させて
    // 更新する関数を宣言
    const toggleTodoListItemStatus = (id,done) => {
        // find() は配列から条件に合う値を見つけて、最初に true になった
        // 要素の値を返し、要素を見つけた時点で処理を停止する
        // done(完了/未完了)の状態を反転させたい todoListItem の id を見つけ、
        // 条件に一致する todoItem を返す
        const todoItem = todoList.find((item) => item.id === id);

        // 現在の todoList の中から、条件に一致した要素である todoItemの
        // done(完了/未完了)を反転させる
        const newTodoItem = {...todoItem, done: !done};

        // updateTodoData() を利用して指定された id のTODOを更新したら、
        // 続いて todoList の状態も更新する
        todoData.updateTodoData(id,newTodoItem).then((updateTodo) => {
            const newTodoList = todoList.map((item) => 
                // idが異なる場合、todoList から取り出した item をそのまま返し、
                // 同じ場合は done(完了/未完了)の状態を反転させた updateTodo を
                // 返して新しい配列 newTodoList を作成
                item.id !== updateTodo.id ? item : updateTodo
            );

            // todoListの現在の状態(state)を newTodoListの内容に更新
            setTodoList(newTodoList);
        });
    };

    // 新規TODOを追加する関数を宣言
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
        // deleteTodoData()を利用して指定されたidのTODOを削除したら、
        // 続いてtodoListの状態も更新する
        // deleteTodoData()は一致したidのTODOを削除する関数
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                // 削除したTODOと id が一致しないTODOをフィルタリングして
                // 新しい配列を返す
                // id が一致したTODOは除外される
                (item) => item.id !== deleteListItemId
            );
            // todoList の状態(state)を更新
            // todoList の状態(state)を 指定された id のTODOが削除された状態に
            // 更新
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
