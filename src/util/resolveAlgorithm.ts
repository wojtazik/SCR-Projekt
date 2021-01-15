import { AlgorithmType } from "../models/Algorithm/AlgorithmType";
import { Task } from "../models/Task/TaskInterface";
import { ALGORITHM_TYPES } from '../config/config'
import resolvePriorityAlgorithm from "../models/Algorithm/Priority/PriorityAlgorithm";
import resolveEDF from "../models/Algorithm/EDF/EDFAlgorithm";
import { TasksInSimulation } from "../models/Simulation/TaskInSimulationInterface";

export const resolveAlgorithm = (tasks: Task[], simulationTime: number, algorithm: AlgorithmType): Array<TasksInSimulation[]> => {
  switch(algorithm) {
    case "PRIORITY":
      return resolvePriorityAlgorithm(tasks, simulationTime)
    case "EDF":
      return resolveEDF(tasks, simulationTime)
    case "DMS":
      // TODO: Change to proper algorithm after implement it
      return resolvePriorityAlgorithm(tasks, simulationTime)
  }
}