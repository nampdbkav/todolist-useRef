import React, { useState, useEffect, useImperativeHandle } from 'react';
import { useContext } from 'react'
import { forwardRef } from 'react';
import { ThemeContext } from './ThemeContext'

const Header = ({ todos, onSubmit, checkAll }, ref) => {

    const [text, setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value)
        console.log(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            id: Math.floor(Math.random() * 100000),
            text,
            complete: false
        })
        setText('')
    }

    const theme = useContext(ThemeContext)

    useImperativeHandle(ref, () => ({
        setText
    }))

    useEffect(() => {
        const body = document.getElementsByTagName("body");
        body[0].className = theme
        console.log('>>chekc effect', theme)
    }, [theme])


    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <code className={theme}>todos</code>
            <div className="input-wrapper">
                {todos.length > 0 && (
                    <input className="toggle-all" type="hidden" />
                )}
                <label
                    htmlFor="toggle-all"
                    onClick={checkAll}
                ></label>
                <input className='new-todo'
                    style={{ background: theme === 'dark' ? '#FF7BA9' : '#fff' }}
                    name="text"
                    placeholder="What need to be done?"
                    value={text}
                    autoFocus
                    onChange={handleChange}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && text) {
                            handleSubmit(event)
                        }
                    }
                    }
                />
            </div>
        </form>
    )

}

export default forwardRef(Header)