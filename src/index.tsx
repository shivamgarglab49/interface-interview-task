import ReactDOM from 'react-dom'
import React from 'react'
import GlobalStyling from './fundamentals/GlobalStyling'

const App: React.FC = () => (
  <>
    <GlobalStyling />
    <h1>Interface Interview Task</h1>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
