import React, { useCallback } from 'react'
import { taskParams } from '../../models/Task/TaskInterface'
import useComponent from './hook'
import './style.scss'

export type RandomizeTasksPopupComponentInterface = {

}

const RandomizeTasksPopup: React.FC<RandomizeTasksPopupComponentInterface> = (props: RandomizeTasksPopupComponentInterface) => {

  const {
    onTogglePopupOpen,
    shouldOpenPopup,
    onSetParam,
    minTasksCount,
    maxTasksCount,
    minExecTime,
    maxExecTime,
    minDeadline,
    maxDeadline,
    minPeriod,
    maxPeriod,
    minPriority,
    maxPriority,
    createRandomTasks
  } = useComponent(props)

  const renderRandomTasksForm = () => {
    return (
      <div>
          <div className='random-tasks-popup__overlay' onClick={onTogglePopupOpen}></div>
          <div className='random-tasks-popup__content'>
              <span className='random-tasks-popup__title'>Set tasks params</span>

              <div className='random-tasks-popup__unit'>
                <span className='random-tasks-popup__unit-label'>Set execution time:</span>
                <input type="number" className='random-tasks-popup__input' value={minExecTime} min={1} onChange={(event) => onSetParam(event, taskParams.EXECUTION_TIME, 'MIN')}/>
                <span>to</span>
                <input type="number" className='random-tasks-popup__input' value={maxExecTime} min={minExecTime} onChange={(event) => onSetParam(event, taskParams.EXECUTION_TIME, 'MAX')}/>
              </div>

              <div className='random-tasks-popup__unit'>
                <span className='random-tasks-popup__unit-label'>Set period:</span>
                <input type="number" className='random-tasks-popup__input'  value={minPeriod} min={1} onChange={(event) => onSetParam(event, taskParams.PERIOD, 'MIN')}/>
                <span>to</span>
                <input type="number" className='random-tasks-popup__input' value={maxPeriod} min={minPeriod} onChange={(event) => onSetParam(event, taskParams.PERIOD, 'MAX')}/>
              </div>

              <div className='random-tasks-popup__unit'>
                <span className='random-tasks-popup__unit-label'>Set deadline:</span>
                <input type="number" className='random-tasks-popup__input' value={minDeadline} min={1} onChange={(event) => onSetParam(event, taskParams.DEADLINE, 'MIN')}/>
                <span>to</span>
                <input type="number" className='random-tasks-popup__input' value={maxDeadline} min={minDeadline} onChange={(event) => onSetParam(event, taskParams.DEADLINE, 'MAX')}/>
              </div>

              <div className='random-tasks-popup__unit'>
                <span className='random-tasks-popup__unit-label'>Set priority:</span>
                <input type="number" className='random-tasks-popup__input' value={minPriority} min={1} onChange={(event) => onSetParam(event, taskParams.PRIORITY, 'MIN')}/>
                <span>to</span>
                <input type="number" className='random-tasks-popup__input' value={maxPriority} min={minPriority} onChange={(event) => onSetParam(event, taskParams.PRIORITY, 'MAX')}/>
              </div>

              <div className='random-tasks-popup__unit'>
                <span className='random-tasks-popup__unit-label'>Set tasks count:</span>
                <input type="number" className='random-tasks-popup__input' value={minTasksCount} min={1} max={10} onChange={(event) => onSetParam(event, 'TASKS_COUNT', 'MIN')}/>
                <span>to</span>
                <input type="number" className='random-tasks-popup__input' value={maxTasksCount} min={minTasksCount} max={10}onChange={(event) => onSetParam(event, 'TASKS_COUNT', 'MAX')}/>
              </div>

              <button onClick={onTogglePopupOpen}>OK</button>
              <p>
                Max execution time must be lower than min period and min deadline
                <br/>
                Max deadline must be lower than min period
              </p>
          </div>
      </div>
    )
  }

  return (
    <div>
        <button onClick={onTogglePopupOpen}>Set random tasks params</button>
        <button onClick={createRandomTasks}>Randomize it!</button>
        {shouldOpenPopup && renderRandomTasksForm()}
    </div>
  )
}

RandomizeTasksPopup.defaultProps = {

}

export default RandomizeTasksPopup