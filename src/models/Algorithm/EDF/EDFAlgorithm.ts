import { cloneDeep } from 'lodash'
import { TasksInSimulation, TaskState } from '../../Simulation/TaskInSimulationInterface'
import { Task } from '../../Task/TaskInterface'

/**
 * UWAGA: JESZCZE NIE DZIAŁA W PEŁNI
 */

const resolveEDF = (tasks: Task[], simulationTime: number): Array<TasksInSimulation[]> => {
  let tasksToModify: Task[] = cloneDeep(tasks)
  let tasksCurrentDeadline = tasks.map((task: Task) => task.deadline)
  let tasksCurrentUnitsLeft = tasks.map((task:Task) => task.executionTime)
  let tasksFinishedCountForDl = tasks.map((task: Task) => 0)
  let tasksInSimulation: Array<TasksInSimulation[]> = tasksToModify.map((task: Task) => [])

  for(let i = 0; i < simulationTime; i++) {
    tasksToModify.forEach((task: Task, index) => {
      if(i !==0 && i % task.period === 0) {
        tasksCurrentUnitsLeft[index] += task.executionTime
      }
    })

    const taskToExecIndex = selectTaskToExecute(tasksCurrentUnitsLeft, tasksCurrentDeadline)

    if(tasksCurrentUnitsLeft[taskToExecIndex] === 0) {
      tasksCurrentDeadline[taskToExecIndex] += tasks[taskToExecIndex].deadline
    }

    tasksCurrentDeadline = tasksCurrentDeadline.map((taskDeadline: number, index: number) => {
      if(tasksCurrentUnitsLeft[index] <= 0) {
        return taskDeadline + tasks[index].period
      }
      return taskDeadline
    })

    tasksCurrentDeadline = tasksCurrentDeadline.map((taskDeadline: number) => {
        return taskDeadline - 1
    })

    tasksCurrentUnitsLeft[taskToExecIndex] -=1

    tasks.map((task: Task, index: number) => {
      if(i !== 0 && (i + 1) % task.deadline === 0 && tasksCurrentUnitsLeft[index] > 0) {
          tasksFinishedCountForDl[index] = tasksCurrentUnitsLeft[index]
      }      
    })
    
    if(tasksFinishedCountForDl[taskToExecIndex] > 0 && tasksCurrentUnitsLeft[taskToExecIndex] % tasks[taskToExecIndex].executionTime === 0) {
      tasksCurrentDeadline[taskToExecIndex] += tasks[taskToExecIndex].deadline
    }

    tasksToModify.forEach((task: Task, index: number) => {

      tasksInSimulation[index][i] = {
        taskState: taskToExecIndex === index ? TaskState.WORKING : tasksFinishedCountForDl[i] > 0 && tasksCurrentUnitsLeft[i] > 0 ? TaskState.INTERRUPTED : TaskState.INACTIVE,
        isTaskOverdue: i === tasksToModify[index].deadline && tasksCurrentUnitsLeft[index] > 0
        }
    })
  }

  return tasksInSimulation
}

const selectTaskToExecute = (currentUnits: number[], currentDeadlines: number[]) => {
  const tasksWithMappedExecuted: number[] = currentUnits.map((unit: number, index: number) => unit <= 0 ? Infinity : currentDeadlines[index])
  const taskToExecute = tasksWithMappedExecuted.indexOf(Math.min(...tasksWithMappedExecuted))

  return taskToExecute
}

export default resolveEDF