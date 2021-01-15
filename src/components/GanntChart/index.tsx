import React, { useCallback, useEffect } from 'react'
import './style.scss'
import { Task, taskParams } from '../../models/Task/TaskInterface'
import GanntChartUnit from '../GanntChartUnit'
import { TasksInSimulation } from '../../models/Simulation/TaskInSimulationInterface'

export type GanntChartInterface = {
  task: Task,
  simulationTime: number,
  taskInSimulation: TasksInSimulation[]
}

const GanntChart = (props: GanntChartInterface) => {
  const generateRandomColor = () => {
    const randomColor = [];

    for(let i = 0; i < 3; i++) {
      randomColor.push(Math.floor(Math.random() * 185 + 50))
    }

    return `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`
  }

  const renderGanntChart = useCallback(() => {
    
    const rowsToRender: JSX.Element[] = []
    const randomColor = generateRandomColor()
    let periodCount = 0
    for(let i = 0; i < props.simulationTime; i++) {
      if (i !== 0 && i % props.task.period === 0) {
        periodCount++
      }
      rowsToRender.push(
        <GanntChartUnit 
          simulationMoment={i}
          task={props.task}
          taskColor={randomColor}
          taskInSimulationMoment={props.taskInSimulation[i]}
          periodCount={periodCount}
        />
      )
    }

    return rowsToRender
  }, [props.task, props.simulationTime])

  const renderAxis = useCallback(() => {
    const { simulationTime } = props
    const units: JSX.Element[] = []

    for(let i = 0; i <= simulationTime; i++) {
      let count: JSX.Element | null = null

      if( i % 5 === 0) {
        count = <div className='gannt-chart__unit-count'>{i}</div>
      } 

      units.push(
        <div className='gannt-chart__time-unit' style={{left: `${i * 20}px`}}>
          {count && count}
        </div>
      )
    }

    return (
      <div className='gannt-chart__axis' style={{ width: `${(simulationTime * 20)}px` }}>
        {units}
      </div>
    )
  }, [props.simulationTime])

  return (
    <div className='gannt-chart'>
      {props.taskInSimulation.length && renderGanntChart()}
      {props.taskInSimulation.length && renderAxis()}
    </div>
  )
}

export default GanntChart