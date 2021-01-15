import React, { useEffect } from 'react'
import { AlgorithmType } from '../../models/Algorithm/AlgorithmType'
import { useSelector, useDispatch } from 'react-redux'
import { StateInterface } from '../../models/state/StateInterface'
import { Task } from '../../models/Task/TaskInterface'
import { TasksInSimulation } from '../../models/Simulation/TaskInSimulationInterface'
import { resolveAlgorithm } from '../../util/resolveAlgorithm'
import { setTasksInSimulation } from '../../store/actions/actions'

export type GanntChartPlaceholderHookInterface = {
  tasks: Task[],
  algorithm: AlgorithmType,
  simulationTime: number,
  tasksInSimulation: Array<TasksInSimulation[]>
}

const useComponent = () => {
  const dispatch = useDispatch()
  const selectedAlgorithm: AlgorithmType = useSelector((state: StateInterface) => state.algorithm)
  const tasks: Task[] = useSelector((state: StateInterface) => state.tasks)
  const simulationTime: number = useSelector((state: StateInterface) => state.simulationTime)
  const tasksInSimulation: Array<TasksInSimulation[]> = useSelector((state: StateInterface) => state.tasksInSimulation)

  useEffect(() => {
    if(tasks.length > 0 && simulationTime > 0 && selectedAlgorithm) {
      const tasksRepresentation = resolveAlgorithm(tasks, simulationTime, selectedAlgorithm)
      dispatch(setTasksInSimulation(tasksRepresentation))
    }
  }, [tasks, simulationTime, selectedAlgorithm])

  return {
    selectedAlgorithm,
    tasks,
    simulationTime,
    tasksInSimulation
  }
}

export default useComponent