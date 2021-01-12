import React, { useCallback } from 'react'
import { ALGORITHM_TYPES } from '../../config/config'
import useComponent from './hook'
import './style.scss'
import SingleTaskForm from '../SingleTaskForm/index'
import { Task } from '../../models/Task/TaskInterface'

export type TaskManagementComponentInterface = {

}

const TaskManagementForm = (props: TaskManagementComponentInterface) => {

  const {
    selectedAlgorithm,
    onSelectAlgorithm,
    tasks,
    onChangeShouldAddEmptyTaskLine,
    shouldAddEmptyTaskLine,
    onSetSimulationTime
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
    <div>
      <div className="task-management__topbar">
        <select onChange={onSelectAlgorithm} defaultValue={selectedAlgorithm}>
          {ALGORITHM_TYPES.map((type: string) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button className="task-management__new-task" onClick={onChangeShouldAddEmptyTaskLine}>New task</button>
        <label>Set simulation time:</label>
        <input type="number" max={200} onChange={onSetSimulationTime}/>
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

