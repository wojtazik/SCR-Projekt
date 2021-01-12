import React from 'react';
import TaskManagementForm from './components/TaskManagementForm/index'
import { useSelector } from 'react-redux';
import { StateInterface } from './models/state/StateInterface'
import { Task } from './models/Task/TaskInterface'
import GanntChartPlaceholder from './components/GanntChartPlaceholder/index'

function App() {
  return (
    <div>
      <h1>Hello Alabama</h1>
      <div>
        <TaskManagementForm /> 
        <div style={{margin: "30px"}}>
          <GanntChartPlaceholder />
        </div> 
      </div>
    </div>
  );
}

export default App;
