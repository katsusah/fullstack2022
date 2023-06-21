import { useState } from 'react'

const App = () => {
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
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}</div>
    </div>
  )
}
  
export default App