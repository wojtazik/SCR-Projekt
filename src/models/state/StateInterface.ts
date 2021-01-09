import { AlgorithmType } from "../Algorithm/AlgorithmType";
import { Task } from "../Task/TaskInterface";

export interface StateInterface {
    tasks: Task[]
    processorUsage: number,
    simulationTime: number
    algorithm: AlgorithmType
}