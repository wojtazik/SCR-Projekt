import { Task } from "../models/Task/TaskInterface";

export default (tasks: Task[], simulationTime: number) => {
    let processorUsage
    const tasksUnitsToDo  = tasks.map((task: Task) => task.executionTime)


    for(let i = 0; i < simulationTime; i++) {
        tasks.forEach((task: Task, index: number) => {
            if(i !== 0 && i % task.period === 0) {
                tasksUnitsToDo[index] += task.executionTime
            }
        })
    }
    const tasksUnitsToDoSum = tasksUnitsToDo.reduce((a, b) => a + b) 
    
    return tasksUnitsToDoSum / simulationTime
}