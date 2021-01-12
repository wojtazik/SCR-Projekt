import { cloneDeep, findIndex, indexOf, reduce } from 'lodash'
import { TaskState } from '../../Simulation/TaskInSimulationInterface'
import { Task } from '../../Task/TaskInterface'

/**
 * UWAGA: JESZCZE NIE DZIAŁA W PEŁNI
 */

const resolveEDF = (tasks: Task[], simulationTime: number): Task[] => {
  let tasksToModify: Task[] = cloneDeep(tasks)
  let tasksCurrentDeadline = tasks.map((task: Task) => task.deadline)
  let tasksCurrentUnitsLeft = tasks.map((task:Task) => task.executionTime)
  let tasksFinishedCountForDl = tasks.map((task: Task) => 0)


  /*
    jeśli aktualnie jest deadline, i ilość pozostałych unitów jest większa od 0
    rejestruj aktualną ilość wykonanych unitów
    jeśli w momencie zakończenia zadania ilość wykonanych unitów w deadlinie
    jest większa od zera, dodaj deadline do local deadline
  */

// jeśli zadanie zostało zakończone po terminie, też dodać deadline

  for(let i = 0; i < simulationTime; i++) {
    console.log('------------START')
    tasksToModify.forEach((task: Task, index) => {
      if(i !==0 && i % task.period === 0) {
        //jeśli aktualna chwila czasu jest podzielna przez okres
        //dodaj kolejne zadanie do wykonania
        tasksCurrentUnitsLeft[index] += task.executionTime
      }
    })

    console.log('Deadlines:', tasksCurrentDeadline)
    console.log('UnitesLeft:', tasksCurrentUnitsLeft)
    const taskToExecIndex = selectTaskToExecute(tasksCurrentUnitsLeft, tasksCurrentDeadline)
    console.log('EXEC:',taskToExecIndex, "   LOOP: ", i)

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
    console.log(tasksFinishedCountForDl)
    console.log('kk', tasksCurrentUnitsLeft[taskToExecIndex])

    //POPRACUJ NAD TYM
    
    console.log('Frytki:', tasksFinishedCountForDl[taskToExecIndex], tasksCurrentUnitsLeft[taskToExecIndex])
    if(tasksFinishedCountForDl[taskToExecIndex] > 0 && tasksCurrentUnitsLeft[taskToExecIndex] % tasks[taskToExecIndex].executionTime === 0) {
      console.log('should be there with task ', taskToExecIndex)
      
      tasksCurrentDeadline[taskToExecIndex] += tasks[taskToExecIndex].deadline
    }

    // USTAWIENIE TASKÓW W STANIE
    tasksToModify.forEach((task: Task, index: number) => {
      tasksToModify[index].taskInSimulation[i] = {
        taskState: taskToExecIndex === index ? TaskState.WORKING : tasksFinishedCountForDl[i] > 0 && tasksCurrentUnitsLeft[i] > 0 ? TaskState.INTERRUPTED : TaskState.INTERRUPTED,
        isTaskOverdue: i === tasksToModify[index].deadline && tasksCurrentUnitsLeft[index] > 0
      }
    })
  }

  return tasksToModify
}

const selectTaskToExecute = (currentUnits: number[], currentDeadlines: number[]) => {
  const tasksWithMappedExecuted: number[] = currentUnits.map((unit: number, index: number) => unit <= 0 ? Infinity : currentDeadlines[index])
  const taskToExecute = tasksWithMappedExecuted.indexOf(Math.min(...tasksWithMappedExecuted))

  return taskToExecute
}

export default resolveEDF