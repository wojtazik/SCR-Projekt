import { TasksInSimulation } from "../Simulation/TaskInSimulationInterface";

export interface Task {
  executionTime: number,
  period: number,
  deadline: number,
  priority: number
  taskInSimulation?: TasksInSimulation[]
}

export const taskParams: {[key: string]: string}  = {
  EXECUTION_TIME: 'EXECUTION_TIME',
  PERIOD: 'PERIOD',
  DEADLINE: 'DEADLINE',
  PRIORITY: 'PRIORITY',
}