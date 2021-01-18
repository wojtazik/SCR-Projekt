import { Task } from "../../Task/TaskInterface";
import { cloneDeep } from 'lodash'
import { TasksInSimulation, TaskState } from "../../Simulation/TaskInSimulationInterface";

const resolveDMSAlgorithm = (
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

    let taskToDoIndex = getHighestDeadlineTask(tasks, tasksUnitToDo)
    
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

const getHighestDeadlineTask = (tasks: Task[], tasksUnitsToDo: number[]) => {
  let taskHasUnitsToDo = false
  let taskToDoIndex = null
  let latestTaskDeadline: number = 0

  while(!taskHasUnitsToDo) {
    let higherDeadlines: number[] = tasks.map((task: Task) => {
      return task.deadline > latestTaskDeadline ? task.deadline : -1
    }).filter((num: number, index) => tasksUnitsToDo[index] > 0)

    const taskDeadlinesToDoMapping = tasks.map((task: Task, index: number) => (
      { 
        haveUnitsToDo: tasksUnitsToDo[index] > 0,
        deadline: task.deadline <= latestTaskDeadline ? task.deadline : -1
      }
    ))

    const taskWithHighestDeadline = tasks.findIndex((task: Task, index: number) => task.deadline === Math.min(...higherDeadlines) && taskDeadlinesToDoMapping[index].haveUnitsToDo === true) 
    if(tasksUnitsToDo[taskWithHighestDeadline]  < 1) {
      latestTaskDeadline = tasks[taskWithHighestDeadline].deadline
    } else {
      taskHasUnitsToDo = true
      taskToDoIndex = taskWithHighestDeadline
    }
  }

  return taskToDoIndex
}

export default resolveDMSAlgorithm