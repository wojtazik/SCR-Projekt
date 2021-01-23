import React, { useCallback } from 'react'
import { ALGORITHM_TYPES } from '../../config/config'
import useComponent from './hook'
import './style.scss'
import SingleTaskForm from '../SingleTaskForm/index'
import { Task } from '../../models/Task/TaskInterface'
import calculateProcessorUsage from '../../util/calculateProcessorUsage'
import RandomizeTasksPopup from '../RandomizeTasksPopup'

export type TaskManagementComponentInterface = {

}

const TaskManagementForm = (props: TaskManagementComponentInterface) => {

  const {
    selectedAlgorithm,
    onSelectAlgorithm,
    tasks,
    onChangeShouldAddEmptyTaskLine,
    shouldAddEmptyTaskLine,
    onSetSimulationTime,
    onCalculateHyperperiod,
    simulationTime
  } = useComponent(props)

  const renderTasksList = useCallback(() => {
    if(tasks.length > 0) {
      const taskComponents = tasks.map((task: Task, index: number) => (
        <SingleTaskForm task={task} index={index} />  
      ))
      if(shouldAddEmptyTaskLine) {
        taskComponents.push(<SingleTaskForm index={tasks.length}/>)
      }

      return taskComponents
    } else {
      return <SingleTaskForm tasksArrayIsEmpty={true}/>
    }
  }, [shouldAddEmptyTaskLine, tasks])

  return (
    <div className="task-management__wrapper">
      <div className="task-management__topbar">
        <label htmlFor="priority" className="ask-management__priority-labelt">Set priority:</label>
        <select onChange={onSelectAlgorithm} defaultValue={selectedAlgorithm} name="priority" className="task-management__action-input">
          {ALGORITHM_TYPES.map((type: string) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button className="task-management__action-input" onClick={onChangeShouldAddEmptyTaskLine}>New task</button>
        <label>Simulation time:</label>
        <input type="number" max={200} min={0} onChange={onSetSimulationTime} className="task-management__action-input" />
        <RandomizeTasksPopup /> 
        {
          simulationTime > 0 && tasks.length > 0 && (
           <>
            <div>
              <span>
                Hyperperiod: {onCalculateHyperperiod()}
              </span>
            </div>
            <div>
              <span>
                Processor Usage: {calculateProcessorUsage(tasks, simulationTime)}
              </span>
            </div>
           </> 
          )
        }
      </div>

      <div className="task-management__tasks">
          <div className="task-management__labels">
            <p className="task-management__label">Czas wykonywania</p>
            <p className="task-management__label">Okres</p>
            <p className="task-management__label">Deadline</p>
            <p className="task-management__label">Priorytet</p>
          </div>
          {renderTasksList()}
      </div>

    </div>
  )
}

export default TaskManagementForm

