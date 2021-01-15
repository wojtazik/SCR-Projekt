import React, { useCallback } from 'react'
import { TaskState } from '../../models/Simulation/TaskInSimulationInterface'
import { Task } from '../../models/Task/TaskInterface'
import './style.scss'

export type GanntChartUnitInterface = {
  task: Task
  simulationMoment: number,
  taskColor: string
}

const GanntChartUnit = (props: GanntChartUnitInterface) => {

  const renderPeriodArrow = useCallback(() => (
    <div className='chart-unit__period-arrow' />
  ), [props])

  const renderDeadlineArrow = useCallback((isOverdue: boolean) => (
    <div className={`chart-unit__deadline-arrow ${isOverdue ? 'chart-unit__deadline-arrow--overdue' : ''}`} />
  ), [props])

  const renderChartUnit = useCallback((): JSX.Element => {
    const resolveClass = () => {
      switch(props.task.taskInSimulation[props.simulationMoment].taskState) {
        case TaskState.INACTIVE:
          return 'inactive'
        case TaskState.INTERRUPTED:
          return 'interrupted'
        case TaskState.WORKING:
          return 'working'
      }
    }

    return (
    <div 
      className={`chart-unit chart-unit--${resolveClass()}`}
      style={{background: props.taskColor}}
      >
        {props.simulationMoment === props.task.period && renderPeriodArrow()}
        {props.simulationMoment === props.task.deadline && renderDeadlineArrow(props.task.taskInSimulation[props.simulationMoment].isTaskOverdue)}
      </div>
    )
  }, [props])

  return (
    <>{renderChartUnit()}</>
  )
}

export default GanntChartUnit