import React, { useCallback, useLayoutEffect, useState } from 'react'
import { AlgorithmType } from '../../models/Algorithm/AlgorithmType'
import { TaskManagementComponentInterface } from './index'
import { useSelector, useDispatch } from 'react-redux'
import { StateInterface } from '../../models/state/StateInterface'
import { setAlgorithm, setSimulationTime } from '../../store/actions/actions'
import { Task } from '../../models/Task/TaskInterface'
import usePrevious from '../../hook/usePrevious'
import calculateHiperperiod from '../../util/calculateHiperperiod'

export type TaskManagementHookInterface = {
  selectedAlgorithm: AlgorithmType,
  onSelectAlgorithm: React.ChangeEventHandler
  tasks: Task[],
  shouldAddEmptyTaskLine: boolean,
  onChangeShouldAddEmptyTaskLine: VoidFunction,
  onSetSimulationTime: React.ChangeEventHandler,
  onCalculateHyperperiod: (tasks: Task[]) => number,
  simulationTime: number
}

const useComponent = (props: TaskManagementComponentInterface) => {
  const dispatch = useDispatch()
  const selectedAlgorithm: AlgorithmType = useSelector((state: StateInterface) => state.algorithm)
  const simulationTime: number = useSelector((state: StateInterface) => state.simulationTime)
  const tasks: Task[] = useSelector((state: StateInterface) => state.tasks)
  const [shouldAddEmptyTaskLine, onSetShouldAddEmptyTaskLine] = useState<boolean>(false)
  const prevTasks = usePrevious(tasks)

  const onSelectAlgorithm = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAlgorithm((event.target.value as AlgorithmType)))
  }, [dispatch])

  const onChangeShouldAddEmptyTaskLine = useCallback(() => {
    onSetShouldAddEmptyTaskLine(!shouldAddEmptyTaskLine)
  }, [onSetShouldAddEmptyTaskLine, shouldAddEmptyTaskLine])

  const onSetSimulationTime = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSimulationTime(parseInt(event.target.value)))
  }, [])

  const onCalculateHyperperiod = useCallback(() => {
    return calculateHiperperiod(tasks)
  }, [tasks])

  useLayoutEffect(() => {
    //@ts-ignore
    if(prevTasks && (prevTasks).length < tasks.length) {
      onSetShouldAddEmptyTaskLine(false)
    }
  }, [tasks])

  return {
    selectedAlgorithm,
    onSelectAlgorithm,
    tasks,
    shouldAddEmptyTaskLine,
    onChangeShouldAddEmptyTaskLine,
    onSetSimulationTime,
    onCalculateHyperperiod,
    simulationTime
  }
}

export default useComponent