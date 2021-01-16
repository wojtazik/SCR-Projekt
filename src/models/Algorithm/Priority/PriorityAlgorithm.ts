import { Task } from "../../Task/TaskInterface";
import { cloneDeep } from 'lodash'
import { TasksInSimulation, TaskState } from "../../Simulation/TaskInSimulationInterface";

const resolvePriorityAlgorithm = (
  tasks: Task[],
  simulationTime: number
): Array<TasksInSimulation[]> => {
  let tasksToModify: Task[] = cloneDeep(tasks)
  let tasksUnitToDo: number[] = tasksToModify.map((task: Task) => task.executionTime)
  let tasksIteration: number[] = tasksToModify.map((task: Task) => 0)
  let tasksInSimulation: Array<TasksInSimulation[]> = tasksToModify.map((task: Task) => [])
  let tasksDone: number[] = tasksToModify.map((task: Task) => 0)
  let taskPeriods = tasksToModify.map((task: Task) => 0)

  for(let i = 0; i < simulationTime; i++) {
    tasksUnitToDo = tasksUnitToDo.map((count: number, index: number) => {
      return i !== 0 && i % tasksToModify[index].period === 0 ? count + tasksToModify[index].executionTime : count
    })

    let taskToDoIndex = getHighestPriorityTask(tasks, tasksUnitToDo)
    
    tasksToModify.forEach((task: Task, index: number) => {
      if(i!==0 && i % task.period === 0) {
        tasksIteration[index] +=1
      }
      if(i > 0 && i % task.period === 0) {
        taskPeriods[index] +=1
      }
    })
    

    tasksToModify.forEach((task: Task, index: number) => {
      let isTaskOverdueForSamePeriodAndDeadline = i > 0 && i % task.deadline === 0 && tasksUnitToDo[index] - task.executionTime > 0
      let isTaskOverdueForDifferendPeriodAndDeadline = i > 0 && i === taskPeriods[index] * tasks[index].period + task.deadline && tasksUnitToDo[index] > 0

      tasksInSimulation[index][i] = {
        taskState: index === taskToDoIndex 
          ? TaskState.WORKING 
          : i !== 0 && index !== taskToDoIndex && tasksDone[index] % task.executionTime !== 0 ? 
          TaskState.INTERRUPTED
          : TaskState.INACTIVE,
          isTaskOverdue: task.period === task.deadline ? isTaskOverdueForSamePeriodAndDeadline : isTaskOverdueForDifferendPeriodAndDeadline
        }
    })

    if(taskToDoIndex !== null && taskToDoIndex !== undefined && taskToDoIndex !== -1) {
      tasksUnitToDo[taskToDoIndex] -=1
      tasksDone[taskToDoIndex] += 1
    }
  }

  return tasksInSimulation
}

const getHighestPriorityTask = (tasks: Task[], tasksUnitsToDo: number[]) => {
  let taskHasUnitsToDo = false
  let taskToDoIndex = null
  let latestTaskPriority: number = 999999999999
  while(!taskHasUnitsToDo) {
    let lowerPriorites: number[] = tasks.map((task: Task) => {
      return task.priority < latestTaskPriority ? task.priority : -1
    }).filter((num: number, index) => tasksUnitsToDo[index] > 0)

    const taskPrioritiesToDoMapping = tasks.map((task: Task, index: number) => (
      { 
        haveUnitsToDo: tasksUnitsToDo[index] > 0,
        priority: task.priority <= latestTaskPriority ? task.priority : -1
      }
    ))

    const taskWithHighestPriority = tasks.findIndex((task: Task, index: number) => task.priority === Math.max(...lowerPriorites) && taskPrioritiesToDoMapping[index].haveUnitsToDo === true) 
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