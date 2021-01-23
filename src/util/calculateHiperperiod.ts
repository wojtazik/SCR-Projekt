import { Task } from "../models/Task/TaskInterface";

export default (tasks: Task[]): number => {
    let hyperperiod = 1

    const tasksPeriods = tasks.map((task: Task) => task.period)
    const highestCommonDividor = tasksPeriods.reduce((prev, curr) => {
        return prev * curr
    })

    for (let i = 0; i <= highestCommonDividor; i++) {
        let isHyperperiod = tasksPeriods.every((period: number) => {
            return i % period === 0
        })

        if (i !== 0 && isHyperperiod) {
            return  i
        }
    }

    return hyperperiod
}