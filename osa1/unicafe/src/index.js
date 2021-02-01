import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <h1>{title}</h1>

const StatisticLine = ({text, value, sign}) => <tr><td>{text}</td><td>{value} {sign}</td></tr>

const Button = ( {onClick, label} ) => (
  <button onClick={onClick}>{label}</button>
)

const Statistics = ( {good, neutral, bad} ) => {
  const sum = good+neutral+bad
  if (sum > 0) {
  return (
    <>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={sum} />
      <StatisticLine text='average' value={(good-bad)/sum} />
      <StatisticLine text='positive' value={good/sum*100} sign='%'/> 
    </>
  )
  } return ('No feedback given')
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={handleGoodClick} label='good' />
      <Button onClick={handleNeutralClick} label='neutral' />
      <Button onClick={handleBadClick} label='bad' />
      <Header title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)