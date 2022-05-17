import React, { useState, createContext } from 'react'
import TodoList from "./TodoList";

const ThemeContext = createContext()




const ThemeProvider = () => {

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div className={theme}>
                <div className="slideOne">
                    <input type="checkbox" value="None" id="slideOne" name="check" onClick={toggleTheme} />
                    <label style={{ background: theme === 'light' ? '#FF7BA9' : '#fff' }} htmlFor="slideOne"></label>
                </div>
                <TodoList />
            </div>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }