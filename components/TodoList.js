import React, { useState } from 'react';
import { useContext } from 'react'


//Components
import Header from './Header';
import Todo from './Todo';
import { ThemeContext } from './ThemeContext'
import Scroll from './Scroll';
import { useRef } from 'react';
import { connect } from 'react-redux';

const filterItem = (items = [], status = "") => {
    switch (status) {
        case "all":
            return items;
        case "active":
            return items.filter((todo) => !todo.complete);
        case "complete":
            return items.filter((todo) => todo.complete);
        default:
            return items;
    }
};

const TodoList = ({ page, todo }) => {

    const [todos, setTodos] = useState([])
    const [todoShow, setTodoShow] = useState('all')
    const [checkAll, setCheckAll] = useState('true')
    const [editTarget, setEditTarget] = useState(-1) // -1 = create

    const headerRef = useRef(null)

    const theme = useContext(ThemeContext)

    const editTodo = (index) => {
        setEditTarget(index)
        headerRef.current.setText(todos[index].text)
    }

    const addTodo = (newTodo) => {
        if (editTarget == -1) {
            setTodos([newTodo, ...todos])
        } else {
            let _todos = [...todos]
            _todos[editTarget] = newTodo
            setTodos(_todos)
            setEditTarget(-1)
        }
    }

    const checkComplete = (id, text, editInput = false) => {

        const arr = todos.map((todo) => {
            if (todo.id === id) {
                if (editInput) {
                    return {
                        ...todo,
                        text,
                        complete: todo.complete
                    }
                } else {
                    return {
                        ...todo,
                        text,
                        complete: !todo.complete
                    }
                }
            } else {
                return todo
            }
        })
        setTodos(arr)
    }

    const checkAllComplete = () => {
        const newTodos = todos.map((todo) => ({
            ...todo,
            complete: checkAll
        }))
        setCheckAll(!checkAll)
        setTodos(newTodos)
    }

    const deleteTodo = (id) => {
        const arr = todos.filter((todo) => todo.id !== id)
        setTodos(arr)
    }

    const removeAllComplete = () => {
        const arr = todos.filter((todo) => !todo.complete)
        setTodos(arr)
    }

    const updateShow = (s) => {
        setTodoShow(s)
    }

    let removeComplete = [...todos].some((todo) => todo.complete)
    // let countActive = todo.length
    // let todo = filterItem(todos, todoShow)


    return (
        <div className={theme}>
            <Header
                onSubmit={addTodo}
                checkAll={checkAllComplete}
                todos={todos}
                ref={headerRef}
            />


            <section className='main'>
                <ol className='todo-list'>
                    {todos.map((todo, i) => (
                        <Todo
                            key={todo.id}
                            checkComplete={(value) =>
                                checkComplete(todo.id, value || todo.text, true)
                            }
                            checkedComplete={(value) =>
                                checkComplete(todo.id, value || todo.text)
                            }
                            onDel={() => deleteTodo(todo.id)}
                            onEdit={() => editTodo(i)}
                            index={i}
                            todo={todo}
                        />
                    ))}
                </ol>
            </section>


            <div className='footer'>
                <div>
                    {/* {countActive} */}
                    <span>: items left</span>
                </div>
                <div >
                    <button className='btn-edit' onClick={() => updateShow("all")}>All</button>
                    <button className='btn-edit' onClick={() => updateShow("active")}>Active</button>
                    <button className='btn-edit' onClick={() => updateShow("complete")}>Complete</button>
                    {removeComplete ? (
                        <button className='btn-edit' onClick={removeAllComplete}>{' '}
                            ClearComplete
                        </button>
                    ) : null}
                </div>
            </div>

        </div>
    )

}

// const mapStateToProps = (state) => {
//     return {
//         todo: state.todoList
//     }
// }

export default TodoList