import React, { useReducer } from 'react'

// useReducer
// 1. Init state
const initState = {
  taskAdding: '',
  taskList: []
}

// 2. Action
const SET_TASK = 'set_task'
const ADD_TASK = 'add_task'
const REMOVE_TASK = 'remove_task'

const setTask = payload => {
  return {
    type: SET_TASK,
    payload
  }
}

const addTask = payload => {
  return {
    type: ADD_TASK,
    payload
  }

}

// 3. Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        ...state,
        taskAdding: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      }
    default: 
      throw new Error('Invalid action type')
  }
}

// 4. Dispatch


function App() {
  const [state, dispatch] = useReducer(reducer, initState)

  const { taskAdding, taskList } = state

  const handleSubmit = () => {
    dispatch(addTask(taskAdding))
    dispatch(setTask(''))
  }

  return (
    <div className="app">
      <h3>To-Do</h3>
      <div className='adding-bar'>
        <input
          value={taskAdding}
          type="text"
          placeholder="Add a new task"
          onChange={(e) => dispatch(setTask(e.target.value))}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>{task} &times;</li>
        ))}
      </ul>
    </div>
  )
}

export default App
