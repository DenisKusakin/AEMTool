import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import FilterMonitor from 'redux-devtools-filter-actions';

export default createDevTools(
  <FilterMonitor
      blacklist={['SERVER_STATUS_UPDATED']}>
      <DockMonitor toggleVisibilityKey="ctrl-h"
                   defaultIsVisible={false}
                   changePositionKey="ctrl-w">
        <LogMonitor />
      </DockMonitor>
  </FilterMonitor>
)
