import { ISetAlgorithm, ISetProcessorUsage, ISetSimulationTime, ISetTasks, SET_ALGORITHM, SET_PROCESSOR_USAGE, SET_SIMULATION_TIME, SET_TASKS } from "./actionsType"
import { Task } from '../../models/Task/TaskInterface'
import { AlgorithmType } from "../../models/Algorithm/AlgorithmType"

export const setTasks = (payload: Task[]): ISetTasks => {
  return {
    type: SET_TASKS,
    payload
  }
}

export const setProcessorUsage = (payload: number): ISetProcessorUsage => {
  return {
    type: SET_PROCESSOR_USAGE,
    payload
  }
}

export const setSimulationTime = (payload: number): ISetSimulationTime => {
  return {
    type: SET_SIMULATION_TIME,
    payload
  }
}

export const setAlgorithm = (payload: AlgorithmType): ISetAlgorithm => {
  return {
    type: SET_ALGORITHM,
    payload
  }
}