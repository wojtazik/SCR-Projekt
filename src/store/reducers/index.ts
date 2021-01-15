import { combineReducers } from 'redux'
import { algorithmReducer, processorUsageReducer, simulationTimeReducer, tasksInSimulationReducer, tasksReducer } from './reducers'

export default combineReducers({
  tasks: tasksReducer,
  processorUsage: processorUsageReducer,
  simulationTime: simulationTimeReducer,
  algorithm: algorithmReducer,
  tasksInSimulation: tasksInSimulationReducer
})