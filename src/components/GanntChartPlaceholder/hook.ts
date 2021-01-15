import React, { useEffect } from 'react'
import { AlgorithmType } from '../../models/Algorithm/AlgorithmType'
import { useSelector, useDispatch } from 'react-redux'
import { StateInterface } from '../../models/state/StateInterface'
import { Task } from '../../models/Task/TaskInterface'
import resolveEDF from '../../models/Algorithm/EDF/EDFAlgorithm'
import { setTasks } from '../../store/actions/actions'

export type GanntChartPlaceholderHookInterface = {
  tasks: Task[],
  algorithm: AlgorithmType,
  simulationTime: number
}

const useComponent = () => {
  const dispatch = useDispatch()
  const selectedAlgorithm: AlgorithmType = useSelector((state: StateInterface) => state.algorithm)
  const tasks: Task[] = useSelector((state: StateInterface) => state.tasks)
  const simulationTime: number = useSelector((state: StateInterface) => state.simulationTime)

  useEffect(() => {
    if(selectedAlgorithm && tasks.length && simulationTime > 0) {
      const resolvedTasks = resolveEDF(tasks, simulationTime)
      console.log(resolvedTasks)
      dispatch(setTasks(resolvedTasks))
    }
  },[
    selectedAlgorithm,
    simulationTime,
    
  ])

  return {
    selectedAlgorithm,
    tasks,
    simulationTime
  }
}

export default useComponent