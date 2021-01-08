import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SingleTaskFormComponentInterface } from './index'
import { cloneDeep } from 'lodash'
import { StateInterface } from '../../models/state/StateInterface'
import { Task, taskParams } from '../../models/Task/TaskInterface'
import { setTasks } from '../../store/actions/actions'
import usePrevious from '../../hook/usePrevious'
import { ErrorInterface } from '../../models/Error/ErrorInterface'

export type SingleTaskFormHookInterface = {
  executionTimeLocal: number,
  periodLocal: number,
  deadlineLocal: number,
  priorityLocal: number,
  onTaskParamChange: (value: number, paramName: string) => void,
  onTaskRemove: VoidFunction,
  inputErrors: ErrorInterface[]
}

const useComponent = (props: SingleTaskFormComponentInterface) => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: StateInterface) => state.tasks)
  const [executionTimeLocal, onSetExecutionTimeLocal] = useState<number>((props.task as Task).executionTime)
  const [periodLocal, onSetPeriodLocal] = useState<number>((props.task as Task).period)
  const [deadlineLocal, onSetDeadlineLocal] = useState<number>((props.task as Task).deadline)
  const [priorityLocal, onSetPriorityLocal] = useState<number>((props.task as Task).priority)
  const prevTasksLength = usePrevious(tasks.length)
  const [inputErrors, onSetInputErrors] = useState<ErrorInterface[]>([])

  const prepareTaskObject = useCallback((): Task => {
    return {
      executionTime: executionTimeLocal,
      period: periodLocal,
      deadline: deadlineLocal,
      priority: priorityLocal
    }
  }, [executionTimeLocal, periodLocal, deadlineLocal, priorityLocal])

  const createFirstTask = useCallback(() => {
    const newTask: Task = prepareTaskObject()
    dispatch(setTasks([newTask]))
  }, [prepareTaskObject, dispatch])

  const updateTaskState = useCallback(() => {
    const tasksCopy: Task[] = cloneDeep(tasks)
      // @ts-ignore
    tasksCopy[props.index] = prepareTaskObject()
    dispatch(setTasks(tasksCopy))
  }, [prepareTaskObject, setTasks, dispatch, tasks, props.index,])

  const onUpdateExecutionTimeLocal = useCallback((value: number) => {
    onSetExecutionTimeLocal(value)
  }, [onSetExecutionTimeLocal])

  const onUpdatePeriodLocal = useCallback((value: number) => {
    onSetPeriodLocal(value)
  }, [onSetPeriodLocal])

  const onUpdateDeadlineLocal = useCallback((value: number) => {
    onSetDeadlineLocal(value)
  }, [onSetDeadlineLocal])

  const onUpdatePriorityLocal = useCallback((value: number) => {
    onSetPriorityLocal(value)
  }, [onSetPriorityLocal])

  const manageInputErrors = useCallback((value: number, paramName: string) => {
    if(!value) {
      onSetInputErrors([
        ...inputErrors,
        {
          errorField: paramName,
          errorMessage: `Field ${paramName} must be greater than 0`
        }
      ])
    } else {
      if(inputErrors.filter((inputError: ErrorInterface) => inputError.errorField === paramName)) {
        const inputErrorsCopy = cloneDeep(inputErrors).filter((inputErr: ErrorInterface) => inputErr.errorField !== paramName)
        onSetInputErrors(inputErrorsCopy)
      }
    }
  }, [onSetInputErrors])

  const onTaskParamChange = useCallback((value: number, paramName: string) => {
    manageInputErrors(value, paramName)

    switch(paramName) {
      case taskParams.EXECUTION_TIME: 
        onUpdateExecutionTimeLocal(value)
        break;
      case taskParams.PERIOD: 
        onUpdatePeriodLocal(value)
        break;
      case taskParams.DEADLINE: 
        onUpdateDeadlineLocal(value)
        break;
      case taskParams.PRIORITY: 
        onUpdatePriorityLocal(value)
        break;
    }
  }, [
    onUpdatePriorityLocal,
    onUpdatePeriodLocal,
    onUpdateDeadlineLocal,
    onUpdateExecutionTimeLocal,
  ])

  const onTaskRemove = useCallback(() => {
    const tasksCopy: Task[] = cloneDeep(tasks).filter((task: Task, currentIndex: number) => props.index !== currentIndex)
    dispatch(setTasks(tasksCopy))
  }, [props.task, props.index, tasks])


  useEffect(() => {
    if(executionTimeLocal > 0 && periodLocal > 0 && deadlineLocal > 0 && priorityLocal > 0) {
      tasks.length > 0 ? updateTaskState() : createFirstTask()
    }
  }, [
    executionTimeLocal,
    periodLocal,
    deadlineLocal,
    priorityLocal
  ])

  useEffect(() => {
    //@ts-ignore
    if(tasks.length < prevTasksLength) {
      onUpdateExecutionTimeLocal((props.task as Task).executionTime)
      onUpdatePeriodLocal((props.task as Task).period)
      onUpdateDeadlineLocal((props.task as Task).deadline)
      onUpdatePriorityLocal((props.task as Task).priority)
    }
  }, [tasks.length])

  return {
    executionTimeLocal,
    periodLocal,
    deadlineLocal,
    priorityLocal,
    onTaskParamChange,
    onTaskRemove,
    inputErrors
  }
}

export default useComponent