import React, { useEffect } from 'react'
import useComponent from './hook'
import './style.scss'
import { Task } from '../../models/Task/TaskInterface'
import GanntChart from '../GanntChart'
import resolvePriorityAlgorithm from '../../models/Algorithm/Priority/PriorityAlgorithm'

const GanntChartPlaceholder = () => {
  
  const { tasks, selectedAlgorithm, simulationTime, tasksInSimulation } = useComponent()

  const renderTasksCharts = () => tasks.map((task: Task, index: number) => (
    <GanntChart task={task} simulationTime={simulationTime} taskInSimulation={tasksInSimulation[index]} />  
  ))

  const renderInvalidArgsInfo = () => (
    <h1 className='gannt-chart-placeholder__no-tasks-info'>ERR: Check passed arguments of simulation and tasks</h1>
  )

  return (
    <div className='gannt-chart-placeholder'>
      { tasksInSimulation.length && tasksInSimulation.length === tasks.length ? renderTasksCharts() : renderInvalidArgsInfo()}
    </div>
  )
}


export default GanntChartPlaceholder