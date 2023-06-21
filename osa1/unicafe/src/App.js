import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    setGood(good + 1)
  }

  const updateNeutral = () => {
    setNeutral(neutral + 1)
  }

  const updateBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={updateGood} text='good' />
      <Button handleClick={updateNeutral} text='neutral' />
      <Button handleClick={updateBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad //kaikkien palautteiden määrä yhtenlaskettuna
  const average = (good - bad) / all //keskiarvo (hyvä 1, neutraali 0, huono -1)
  const positive = good / all * 100 //positiivisten palautteiden prosenttiosuus

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </table>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}
  
export default App