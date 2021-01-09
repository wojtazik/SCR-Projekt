import { Task } from "../../Task/TaskInterface";
import { max } from 'lodash'

const resolvePriorityAlgorithm = (
  tasks: Task[],
  simulationTime: number
): Task[] => {

  for(let i = 0; i < simulationTime; i++) {
  }

  return []
}

const getHighestPriorityTask = (tasks: Task[]) => {
  return tasks.reduce((prev: Task, current: Task) => {
    return (prev.priority > current.priority ? prev : current)
  })
}

export default resolvePriorityAlgorithm