import React from 'react'
import useComponent from './hook'
import './style.scss'
import { Task } from '../../models/Task/TaskInterface'
import GanntChart from '../GanntChart'

const GanntChartPlaceholder = () => {
  
  const { tasks, selectedAlgorithm, simulationTime } = useComponent()


  const renderTasksCharts = () => tasks.map((task: Task) => (
    <GanntChart task={task} simulationTime={simulationTime} />  
  ))

  const renderInvalidArgsInfo = () => (
    <h1 className='gannt-chart-placeholder__no-tasks-info'>ERR: Check passed arguments of simulation and tasks</h1>
  )

  return (
    <div className='gannt-chart-placeholder'>
      {(!tasks.length || !selectedAlgorithm || simulationTime < 1 || tasks[0].taskInSimulation.length === 0) ? renderInvalidArgsInfo() : renderTasksCharts()}
    </div>
  )
}


export default GanntChartPlaceholder