import { AlgorithmType } from "../Algorithm/AlgorithmType";
import { TasksInSimulation } from "../Simulation/TaskInSimulationInterface";
import { Task } from "../Task/TaskInterface";

export interface StateInterface {
    tasks: Task[]
    processorUsage: number
    simulationTime: number
    algorithm: AlgorithmType
    tasksInSimulation: Array<TasksInSimulation[]>
}