import React, { useCallback } from 'react'
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

  const renderInputErrors = useCallback(() => {
    const inputErrorsMessages: JSX.Element[] = []
    for(const key in inputErrors) {
      if(inputErrors[key].length > 0) {
        inputErrors[key].forEach((inputError: ErrorInterface) => {
          const errorElement = <p>{inputError.errorMessage}</p>
          inputErrorsMessages.push(errorElement)
        })
      }
    }

    return inputErrorsMessages
  }, [inputErrors])

  return (
    <>
      <div className='single-task'>
        <input 
          className='single-task__field'
          min={0}
          type="number"
          value={executionTimeLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.EXECUTION_TIME) 
          }}
        />
        <input 
          className='single-task__field'
          min={0}
          type="number"
          value={periodLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.PERIOD) 
          }}
        />
        <input 
          className='single-task__field'
          type="number"
          min={0}
          value={deadlineLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.DEADLINE) 
          }}
        />
        <input 
          className='single-task__field'
          type="number"
          min={0}
          value={priorityLocal} 
          onChange={(event: React.FormEvent<HTMLInputElement>) => { 
            onTaskParamChange(parseInt(event.currentTarget.value), taskParams.PRIORITY) 
          }}
        />
        <button onClick={onTaskRemove}>Delete</button>
      </div>
      <div>
        {renderInputErrors()}
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