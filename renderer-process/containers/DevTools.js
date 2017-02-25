import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import FilterMonitor from 'redux-devtools-filter-actions';

export default createDevTools(
  <FilterMonitor
      blacklist={['UPDATE_STATUS']}>
      <DockMonitor toggleVisibilityKey="ctrl-h"
                   changePositionKey="ctrl-w">
        <LogMonitor />
      </DockMonitor>
  </FilterMonitor>
)
