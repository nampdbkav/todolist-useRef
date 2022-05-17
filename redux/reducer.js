import React from "react";

const initState = {
    todoList: [
        { id: 1, text: 'abc', complete: false },
        { id: 2, text: 'abc', complete: true },
    ],
    filter: {
        status: 'ALL',
    }
}
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'todoList/addTodo':
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    { id: 3, text: 'abc', complete: false },
                ]
            }
        default:
            return state;
    }
}

export default rootReducer;