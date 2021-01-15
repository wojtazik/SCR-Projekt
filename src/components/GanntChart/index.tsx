import React, { useCallback, useEffect } from 'react'
import './style.scss'
import { Task } from '../../models/Task/TaskInterface'
import GanntChartUnit from '../GanntChartUnit'

export type GanntChartInterface = {
  task: Task,
  simulationTime: number
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
    
    for(let i = 0; i < props.simulationTime; i++) {
      rowsToRender.push(
        <GanntChartUnit 
          simulationMoment={i}
          task={props.task}
          taskColor={randomColor}
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
      {renderGanntChart()}
      {renderAxis()}
    </div>
  )
}

export default GanntChart