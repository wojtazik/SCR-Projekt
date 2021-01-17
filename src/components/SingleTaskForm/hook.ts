import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SingleTaskFormComponentInterface } from './index'
import { cloneDeep } from 'lodash'
import { StateInterface } from '../../models/state/StateInterface'
import { Task, taskParams } from '../../models/Task/TaskInterface'
import { setTasks } from '../../store/actions/actions'
import usePrevious from '../../hook/usePrevious'
import { ErrorInterface } from '../../models/Error/ErrorInterface'
import { InputsErrors } from '../../models/Error/InputErrorsInterface'
import manageErrors from '../../util/manageInputErrors'

export type SingleTaskFormHookInterface = {
  executionTimeLocal: number,
  periodLocal: number,
  deadlineLocal: number,
  priorityLocal: number,
  onTaskParamChange: (value: number, paramName: string) => void,
  onTaskRemove: VoidFunction,
  inputErrors: InputsErrors
}

const useComponent = (props: SingleTaskFormComponentInterface) => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: StateInterface) => state.tasks)
  const [executionTimeLocal, onSetExecutionTimeLocal] = useState<number>((props.task as Task).executionTime)
  const [periodLocal, onSetPeriodLocal] = useState<number>((props.task as Task).period)
  const [deadlineLocal, onSetDeadlineLocal] = useState<number>((props.task as Task).deadline)
  const [priorityLocal, onSetPriorityLocal] = useState<number>((props.task as Task).priority)
  const prevTasksLength = usePrevious(tasks.length)
  const [inputErrors, onSetInputErrors] = useState<InputsErrors>({
    [taskParams.DEADLINE]: [],
    [taskParams.PERIOD]: [],
    [taskParams.EXECUTION_TIME]: [],
    [taskParams.PRIORITY]: [],

  })

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

  const manageInputErrors = useCallback(() => {
    const inputErr = manageErrors(executionTimeLocal, periodLocal, deadlineLocal, priorityLocal)

    onSetInputErrors(inputErr)
    return inputErr
  }, [executionTimeLocal, periodLocal, deadlineLocal, priorityLocal, onSetInputErrors])

  const onTaskParamChange = useCallback((value: number, paramName: string) => {
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
    const errors: InputsErrors = manageInputErrors()
    if ( 
        errors[taskParams.EXECUTION_TIME].length === 0 &&
        errors[taskParams.PERIOD].length === 0 &&
        errors[taskParams.DEADLINE].length === 0 &&
        errors[taskParams.PRIORITY].length === 0 
      ) {
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