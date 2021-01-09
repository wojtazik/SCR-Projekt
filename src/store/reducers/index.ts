import { combineReducers } from 'redux'
import { algorithmReducer, processorUsageReducer, simulationTimeReducer, tasksReducer } from './reducers'

export default combineReducers({
  tasks: tasksReducer,
  processorUsage: processorUsageReducer,
  simulationTime: simulationTimeReducer,
  algorithm: algorithmReducer
})