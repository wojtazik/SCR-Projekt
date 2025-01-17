import { AlgorithmType } from "../../models/Algorithm/AlgorithmType";
import { TasksInSimulation } from "../../models/Simulation/TaskInSimulationInterface";
import { Task } from "../../models/Task/TaskInterface";
import { ISetAlgorithm, ISetProcessorUsage, ISetSimulationTime, ISetTasks, ISetTasksInSimulation, SET_ALGORITHM, SET_PROCESSOR_USAGE, SET_SIMULATION_TIME, SET_TASKS, SET_TASKS_IN_SIMULATION } from "../actions/actionsType";

export const tasksReducer = (state: Task[] = [], action: ISetTasks) => {
  switch (action.type) {
    case SET_TASKS:
      state = action.payload
      return state
    default:
      return state
  }
}

export const processorUsageReducer = (state: number = 0, action: ISetProcessorUsage) => {
  switch (action.type) {
    case SET_PROCESSOR_USAGE:
      state = action.payload
      return state
    default:
      return state
  }
}

export const simulationTimeReducer = (state: number = 0, action: ISetSimulationTime) => {
  switch (action.type) {
    case SET_SIMULATION_TIME:
      state = action.payload
      return state
    default:
      return state
  }
}

export const algorithmReducer = (state: AlgorithmType = "PRIORITY", action: ISetAlgorithm) => {
  switch (action.type) {
    case SET_ALGORITHM:
      state = action.payload
      return state
    default:
      return state
  }
}

export const tasksInSimulationReducer = (state: Array<TasksInSimulation[]> = [], action: ISetTasksInSimulation) => {
  switch (action.type) {
    case SET_TASKS_IN_SIMULATION:
      state = action.payload
      return state
    default:
      return state
  }
}