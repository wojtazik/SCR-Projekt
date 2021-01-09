enum TaskState  {
    WORKING = 0,
    INTERRUPTED = 1,
    INACTIVE = 2
    
}

export interface TasksInSimulation {
    simulationMoment: number
    taskState: TaskState
}