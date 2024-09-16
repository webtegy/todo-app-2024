import React, { createContext, useReducer } from 'react';

export const TodoContext = createContext();

const initialState = {
    tasks: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TASKS':
            state.tasks = [];
            return { tasks: action.payload };
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'REMOVE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case 'UPDATE_TASK':
            return { ...state, tasks: state.tasks.map(task => (task.id == action.payload.id ? action.payload.task : task)) };
        default:
            return state;
    }
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <TodoContext.Provider value={{ state, dispatch}}>
        {children}
      </TodoContext.Provider>
    );
};