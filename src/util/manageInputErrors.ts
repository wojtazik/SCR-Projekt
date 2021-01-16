import { InputsErrors } from "../models/Error/InputErrorsInterface"
import { taskParams } from "../models/Task/TaskInterface"

export default (
  executionTime: number,
  period: number,
  deadline: number,
  priority: number,
): InputsErrors => {
  const inputErrors: InputsErrors = {
    [taskParams.EXECUTION_TIME]: [],
    [taskParams.PERIOD]: [],
    [taskParams.DEADLINE]: [],
    [taskParams.PRIORITY]: []
  }

  if(executionTime === 0) {
    inputErrors[taskParams.EXECUTION_TIME].push({
      errorField: taskParams.EXECUTION_TIME,
      errorMessage: `Field ${taskParams.EXECUTION_TIME} must be greater than 0`
    })
  }

  if(period === 0) {
    inputErrors[taskParams.PERIOD].push({
      errorField: taskParams.PERIOD,
      errorMessage: `Field ${taskParams.PERIOD} must be greater than 0`
    })
  }

  if(deadline === 0) {
    inputErrors[taskParams.DEADLINE].push({
      errorField: taskParams.DEADLINE,
      errorMessage: `Field ${taskParams.DEADLINE} must be greater than 0`
    })
  }

  if(priority === 0) {
    inputErrors[taskParams.PRIORITY].push({
      errorField: taskParams.PRIORITY,
      errorMessage: `Field ${taskParams.PRIORITY} must be greater than 0`
    })
  }

  if(deadline > period) {
    inputErrors[taskParams.DEADLINE].push({
      errorField: taskParams.DEADLINE,
      errorMessage: `Deadline must be lower than period`
    })
  }

  if(executionTime > period || executionTime > deadline) {
    inputErrors[taskParams.EXECUTION_TIME].push({
      errorField: taskParams.EXECUTION_TIME,
      errorMessage: `Execution time must be lower than period and deadline`
    })
  }

  return inputErrors
}