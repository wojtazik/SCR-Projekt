import { Task } from '../../models/Task/TaskInterface'
import { AlgorithmType } from '../../models/Algorithm/AlgorithmType'

export interface ISetTasks {
  type: string,
  payload: Task[]
}

export interface ISetProcessorUsage {
  type: string,
  payload: number
}

export interface ISetSimulationTime {
  type: string,
  payload: number
}

export interface ISetAlgorithm {
  type: string,
  payload: AlgorithmType
}

export const SET_TASKS = 'SET_TASKS'
export const SET_PROCESSOR_USAGE = 'SET_PROCESSOR_USAGE'
export const SET_SIMULATION_TIME = 'SET_SIMULATION_TIME'
export const SET_ALGORITHM = 'SET_ALGORITHM'