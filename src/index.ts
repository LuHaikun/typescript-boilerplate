import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './api/common/axiosInit'
import './style/reset.css'
import './style/index.less'

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
)
