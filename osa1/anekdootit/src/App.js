import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const updateSelected = () => {
    console.log('satunnainen numero', Math.floor(Math.random() * anecdotes.length))
    setSelected(Math.floor(Math.random() * anecdotes.length)) //päivitetään valittu indeksi satunnaisella numerolla
  }

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0)) //luodaan tyhjä taulukko pisteille
  const updateVote = () => { //päivitetään pisteet taulukon kopion avulla
    console.log('pisteet ennen', points)
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    console.log('pisteet jälkeen', copy)
  }
    
  return (
    <div>
      <Title text='Anecdote of the day' />
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p>
        <Button handleClick={updateVote} text='vote' />
        <Button handleClick={updateSelected} text='next anecdote' />
      </p>
      <Title text='Anecdote with most votes' />
      {anecdotes[points.indexOf(Math.max(...points))]}
      <p>has {Math.max(...points)} votes</p>
    </div>
  )
}

const Title = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

export default App