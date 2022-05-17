import React, { useState } from 'react';

const Todo = ({ todo: { complete, text }, checkedComplete, checkComplete, onDel, onEdit, index }) => {

    const [open, setOpen] = useState(false)
    const [del, setDel] = useState(false)

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            checkComplete(event.target.value)
            setOpen(!open)
        }
    }

    const handleOnMouseEnter = () => {
        setDel(!del)
    }

    const handleOnMouseLeave = () => {
        setDel(false)
        setOpen(false)
    }

    const editButton = () => {
        setOpen(!open)
    }


    return (
        <li
        //onMouseEnter={handleOnMouseEnter}
        // onMouseLeave={handleOnMouseLeave}
        >
            <div className='first'
                style={{ textDecoration: complete ? 'line-through' : '' }}
            >
                <input type='checkbox'
                    checked={complete}
                    onClick={() => checkedComplete()}
                    onChange={() => { }}
                />
                <div
                    className='double'
                >
                    {open ? (
                        <input className='input-edit'
                            defaultValue={text}
                            onKeyDown={handleEnter}
                            autoFocus
                        />
                    ) : ((index + 1) + ': ' + text)}


                </div>
            </div>
            <button className='btn-edit' onClick={onEdit}>Edit</button>
            <button className='btn-edit' onClick={onDel}>Delete</button>
        </li>
    )

}

export default Todo