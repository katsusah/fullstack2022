import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    setGood(good + 1)
    console.log('value of good', good)
  }

  const updateNeutral = () => {
    setNeutral(neutral + 1)
    console.log('value of neutral', neutral)
  }

  const updateBad = () => {
    setBad(bad + 1)
    console.log('value of bad', bad)
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
  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App