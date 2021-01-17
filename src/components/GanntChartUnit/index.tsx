import React, { useCallback } from 'react'
import { TasksInSimulation, TaskState } from '../../models/Simulation/TaskInSimulationInterface'
import { Task } from '../../models/Task/TaskInterface'
import './style.scss'

export type GanntChartUnitInterface = {
  task: Task
  simulationMoment: number,
  taskColor: string,
  taskInSimulationMoment: TasksInSimulation,
  periodCount: number
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
      switch(props.taskInSimulationMoment.taskState) {
        case TaskState.INACTIVE:
          return 'inactive'
        case TaskState.INTERRUPTED:
          return 'interrupted'
        case TaskState.WORKING:
          return 'working'
      }
    }
    const shouldRenderDeadlineArrow = props.task.period === props.task.deadline ? props.simulationMoment % props.task.deadline === 0 : props.simulationMoment === props.periodCount * props.task.period + props.task.deadline

    return (
    <div 
      className={`chart-unit chart-unit--${resolveClass()}`}
      style={{background: props.taskColor}}
      >
        {props.simulationMoment % props.task.period === 0 && renderPeriodArrow()}
        {shouldRenderDeadlineArrow && renderDeadlineArrow(props.taskInSimulationMoment.isTaskOverdue)}
      </div>
    )
  }, [props])

  return (
    <>{renderChartUnit()}</>
  )
}

export default GanntChartUnit