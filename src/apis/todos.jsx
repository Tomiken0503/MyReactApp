import axios from "axios";

// モックサーバーのURL
const todoDataUrl = "http://localhost:3100/todos";

// axios.get() でリクエストを送信
// サーバー上のすべてのTODOを取得する関数
export const getAllTodosData = async () => {

    // 戻される値はすべて response に保存
    const response = await axios.get(todoDataUrl);

    // 通信後、レスポンスデータを返す
    return response.data;
};

// axios.post() で新規TODOを追加する関数
export const addTodoData = async(todo) => {

    // 第2引数に、送信したいデータを指定してPOST送信
    // サーバーに転送することで新規のデータ追加
    const response = await axios.post(todoDataUrl,todo);

    // 通信後、レスポンスデータを返す
    return response.data;
};

// 一致したid のTODOを削除する関数
export const deleteTodoData = async (id) => {
    await axios.delete(`${todoDataUrl}/${id}`);

    // 通信後、削除したTODOの id を返す
    return id;
};

// 一致した id のTODOを更新する関数を宣言
export const updateTodoData = async (id,todo) => {
    // 第2引数に更新したいデータを渡す
    const response = await axios.put(`${todoDataUrl}/${id}`,todo);

    // 通信後、レスポンスデータを返す
    return response.data;
};


