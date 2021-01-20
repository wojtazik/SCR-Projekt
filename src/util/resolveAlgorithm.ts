import { AlgorithmType } from "../models/Algorithm/AlgorithmType";
import { Task } from "../models/Task/TaskInterface";
import { ALGORITHM_TYPES } from '../config/config'
import resolvePriorityAlgorithm from "../models/Algorithm/Priority/PriorityAlgorithm";
import resolveEDF from "../models/Algorithm/EDF/EDFAlgorithm";
import { TasksInSimulation } from "../models/Simulation/TaskInSimulationInterface";
import resolveDMSAlgorithm from "../models/Algorithm/DMS/DMSAlgorithm";

export const resolveAlgorithm = (tasks: Task[], simulationTime: number, algorithm: AlgorithmType): Array<TasksInSimulation[]> => {
  switch(algorithm) {
    case "PRIORITY":
      return resolvePriorityAlgorithm(tasks, simulationTime)
    case "EDF":
      return resolveEDF(tasks, simulationTime)
    case "DMS":
      return resolveDMSAlgorithm(tasks, simulationTime)
  }
}