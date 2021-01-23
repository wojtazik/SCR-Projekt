import { Task } from "../models/Task/TaskInterface"

export default (
    minExecTime: number,
    maxExecTime: number,
    minPeriod: number,
    maxPerdod: number,
    minDeadline: number,
    maxDeadline: number,
    minpriority: number,
    maxPriority: number
): Task => {
    const executionTime = Math.floor(Math.random() * (maxExecTime - minExecTime)) + minExecTime
    const period = Math.floor(Math.random() * (maxPerdod - minPeriod)) + minPeriod
    const deadline = Math.floor(Math.random() * (maxDeadline - minDeadline)) + minDeadline
    const priority = Math.floor(Math.random() * (maxPriority - minpriority)) + minpriority

    return {
        deadline,
        priority,
        period,
        executionTime
    }
}