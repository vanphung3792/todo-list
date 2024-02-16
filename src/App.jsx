import React, { useEffect, useReducer, useRef } from 'react'

// useReducer
// 1. Init state
const localData = JSON.parse(localStorage.getItem('taskList'))
const initState = {
  taskAdding: '',
  taskList: localData ? localData : []
}

// 2. Action
const ACTIONS = {
  SET_TASK: 'set_task',
  ADD_TASK: 'add_task',
  REMOVE_TASK: 'remove_task'
}

const setTask = payload => {
  return {
    type: ACTIONS.SET_TASK,
    payload
  }
}

const addTask = payload => {
  return {
    type: ACTIONS.ADD_TASK,
    payload
  }
}

const removeTask = payload => {
  return {
    type: ACTIONS.REMOVE_TASK,
    payload
  }

}

// 3. Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASK:
      return {
        ...state,
        taskAdding: action.payload
      }
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      }
    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        taskList: state.taskList.filter((task,index) => task && index !== action.payload)
      }
    default: 
      throw new Error('Invalid action type')
  }
}

// 4. Dispatch


function App() {

  const [state, dispatch] = useReducer(reducer, initState)

  const { taskAdding, taskList } = state
  
  const inputRef = useRef()

  const handleSubmit = () => {
    dispatch(addTask(taskAdding))
    dispatch(setTask(''))

    inputRef.current.focus()
  }

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }, [taskList])

  return (
    <div className="app">
      <h3>To-Do</h3>
      <div className='adding-bar'>
        <input
          ref={inputRef}
          value={taskAdding}
          type="text"
          placeholder="Add a new task"
          onChange={(e) => dispatch(setTask(e.target.value))}
        />
        <button className='add-btn' onClick={handleSubmit}>Add</button>
      </div>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>{task}<button className='remove-btn' onClick={() => dispatch(removeTask(index))}>&times;</button></li>
        ))}
      </ul>
    </div>
  )
}

export default App
