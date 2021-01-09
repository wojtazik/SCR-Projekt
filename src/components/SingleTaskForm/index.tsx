import React from 'react'
import { Task } from '../../models/Task/TaskInterface'
import useComponent from './hook'
import { taskParams } from '../../models/Task/TaskInterface'
import { ErrorInterface } from '../../models/Error/ErrorInterface'

export type SingleTaskFormComponentInterface = {
  task?: Task,
  index?: number,
  tasksArrayIsEmpty?: boolean
}

const SingleTaskForm: React.FC<SingleTaskFormComponentInterface> = (props: SingleTaskFormComponentInterface) => {

  const {
    deadlineLocal,
    executionTimeLocal,
    periodLocal,
    priorityLocal,
    onTaskParamChange,
    onTaskRemove,
    inputErrors
  } = useComponent(props)
  console.log(inputErrors)
  return (
    <>
      <div className='single-task'>
        <input 
          className='single-task__field'
          type="number"
          value={executionTimeLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.EXECUTION_TIME) 
          }}
        />
        <input 
          className='single-task__field'
          type="number"
          value={periodLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.PERIOD) 
          }}
        />
        <input 
          className='single-task__field'
          type="number"
          value={deadlineLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.DEADLINE) 
          }}
        />
        <input 
          className='single-task__field'
          type="number"
          value={priorityLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.PRIORITY) 
          }}
        />
        <button onClick={onTaskRemove}>Delete</button>
      </div>
      <div>
        {inputErrors.map((inputError: ErrorInterface) => (<p>{inputError.errorMessage}</p>))}
      </div>
    </>
  )
}

SingleTaskForm.defaultProps = {
  task: {
    deadline: 0,
    executionTime: 0,
    period: 0,
    priority: 0
  },
  index: 0,
  tasksArrayIsEmpty: false
}

export default SingleTaskForm