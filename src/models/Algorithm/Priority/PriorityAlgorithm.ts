import { Task } from "../../Task/TaskInterface";
import { cloneDeep, max } from 'lodash'
import { TaskState } from "../../Simulation/TaskInSimulationInterface";

const resolvePriorityAlgorithm = (
  tasks: Task[],
  simulationTime: number
): Task[] => {
  let tasksToModify = cloneDeep(tasks)
  let tasksUnitToDo: number[] = tasksToModify.map((task: Task) => task.executionTime)
  for(let i = 0; i < simulationTime; i++) {
    tasksUnitToDo = tasksUnitToDo.map((count: number, index: number) => {
      return i !== 0 && i % tasksToModify[index].period === 0 ? count + tasksToModify[index].executionTime : count
    })

    let taskToDoIndex = getHighestPriorityTask(tasks, tasksUnitToDo)

    //TODO: Finish passing simulation state
    tasksToModify.forEach((task: Task, index: number) => {
      tasksToModify[index].taskInSimulation.push({
        taskState: index === taskToDoIndex 
          ? TaskState.WORKING 
          : i !== 0 && i === task.deadline && tasksUnitToDo[index] > 0 ?
          TaskState.INTERRUPTED
          : TaskState.INACTIVE,
          isTaskOverdue: i === task.deadline && tasksUnitToDo[index] > 0
      })
    })

    if(taskToDoIndex !== null) {
      tasksUnitToDo[taskToDoIndex] -=1
    }
  }

  return tasksToModify
}

const getHighestPriorityTask = (tasks: Task[], tasksUnitsToDo: number[]) => {
  let taskHasUnitsToDo = false
  let taskToDoIndex = null
  let latestTaskPriority: number = 999999999999
  while(!taskHasUnitsToDo) {
    let lowerPriorites: number[] = tasks.map((task: Task) => {
      return task.priority < latestTaskPriority ? task.priority : -1
    }).filter((num: number, index) => tasksUnitsToDo[index] > 0)
    const taskWithHighestPriority = tasks.findIndex((task: Task) => task.priority === Math.max(...lowerPriorites)) 
    if(tasksUnitsToDo[taskWithHighestPriority]  < 1) {
      latestTaskPriority = tasks[taskWithHighestPriority].priority
    } else {
      taskHasUnitsToDo = true
      taskToDoIndex = taskWithHighestPriority
    }
  }

  return taskToDoIndex
}

export default resolvePriorityAlgorithm