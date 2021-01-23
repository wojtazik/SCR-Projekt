import { every } from 'lodash'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { taskParams } from '../../models/Task/TaskInterface'
import { setTasks } from '../../store/actions/actions'
import createRandomTask from '../../util/createRandomTask'
import { RandomizeTasksPopupComponentInterface } from './index'


export type RandomizeTasksPopupHookInterface = {
  shouldOpenPopup: boolean,
  onTogglePopupOpen: VoidFunction,
  minExecTime: number,
  maxExecTime: number,
  minPeriod: number,
  maxPeriod: number,
  minDeadline: number,
  maxDeadline: number,
  minPriority: number,
  maxPriority: number,
  minTasksCount: number,
  maxTasksCount: number,
  onSetParam: (event: ChangeEvent, param: string, type: string) => void,
  createRandomTasks: VoidFunction
}

const useComponent = (props: RandomizeTasksPopupComponentInterface) => {
  const [shouldOpenPopup, onSetShouldOpenPopup] = useState<boolean>(false)
  const [minExecTime, onSetMinExecTime] = useState<number>(1)
  const [maxExecTime, onSetMaxExecTime] = useState<number>(1)

  const [minPeriod, onSetMinPeriod] = useState<number>(1)
  const [maxPeriod, onSetMaxPeriod] = useState<number>(1)

  const [minDeadline, onSetMinDeadline] = useState<number>(1)
  const [maxDeadline, onSetMaxDeadline] = useState<number>(1)

  const [minPriority, onSetMinPriority] = useState<number>(1)
  const [maxPriority, onSetMaxPriority] = useState<number>(1)

  const [minTasksCount, onSetMinTasksCount] = useState<number>(1)
  const [maxTasksCount, onSetMaxTasksCount] = useState<number>(1)

  const dispatch = useDispatch()

  const onTogglePopupOpen = useCallback(() => {
    onSetShouldOpenPopup((!shouldOpenPopup))
  }, [shouldOpenPopup])

  const onSetParam = (event: React.ChangeEvent<HTMLInputElement>, param: string, type: string) => {
    if(param === taskParams.EXECUTION_TIME && type === 'MIN') {
      onSetMinExecTime(parseInt(event.target.value))
    } else if (param === taskParams.EXECUTION_TIME && type === 'MAX') {
      onSetMaxExecTime(parseInt(event.target.value))
    } else if (param === taskParams.PERIOD && type === 'MIN') {
      onSetMinPeriod(parseInt(event.target.value))
    } else if (param === taskParams.PERIOD && type === 'MAX') {
      onSetMaxPeriod(parseInt(event.target.value))
    } else if (param === taskParams.DEADLINE && type === 'MIN') {
      onSetMinDeadline(parseInt(event.target.value))
    } else if (param === taskParams.DEADLINE && type === 'MAX') {
      onSetMaxDeadline(parseInt(event.target.value))
    } else if (param === taskParams.PRIORITY && type === 'MIN') {
      onSetMinPriority(parseInt(event.target.value))
    } else if (param === taskParams.PRIORITY && type === 'MAX') {
      onSetMaxPriority(parseInt(event.target.value))
    } else if (param === "TASKS_COUNT" && type === 'MIN') {
      onSetMinTasksCount(parseInt(event.target.value))
    } else if (param === "TASKS_COUNT" && type === 'MAX') {
      onSetMaxTasksCount(parseInt(event.target.value))
    }
  }

  const createRandomTasks = () => {
    console.log(        minExecTime,
      maxExecTime,
      minPeriod,
      maxPeriod,
      minDeadline,
      maxDeadline,
      minPriority,
      maxPriority)
    if(
      maxExecTime <= minPeriod &&
      maxExecTime <= minDeadline &&
      maxDeadline <= minPeriod
    ) {
      const tasksCount = Math.floor(Math.random() * (maxTasksCount - minTasksCount)) + minTasksCount

      const tasks = []

      for(let i = 0; i < tasksCount; i++) {
        tasks.push(createRandomTask(
          minExecTime,
          maxExecTime,
          minPeriod,
          maxPeriod,
          minDeadline,
          maxDeadline,
          minPriority,
          maxPriority
        ))
      }

      dispatch(setTasks(tasks))
    }
  }


  return {
    shouldOpenPopup,
    minExecTime,
    maxExecTime,
    minPeriod,
    maxPeriod,
    minDeadline,
    maxDeadline,
    minPriority,
    maxPriority,
    minTasksCount,
    maxTasksCount,
    onSetParam,
    onTogglePopupOpen,
    createRandomTasks
  }
}

export default useComponent