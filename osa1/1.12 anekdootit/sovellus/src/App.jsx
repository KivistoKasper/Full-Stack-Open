import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

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
   
  const [selected, setSelected] = useState(0)

  const anecdotesLenght = anecdotes.length;
  const zeros = Array(anecdotesLenght).fill(0);
  //console.log("zeros: ", zeros)

  const [points, setPoints] = useState(zeros);
  //console.log("start points: ", points)

  const handlePoints = index => {
    const pointsCopy = [...points];
    pointsCopy[index] += 1;
    setPoints(pointsCopy)
    
    console.log("points copy: ", pointsCopy)
    console.log("points: ", points)
  }

  const randomGenrator = () => {
    const min = 0;
    const max = anecdotes.length-1;
    // Random number generator taken from Google
    const newRand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("Random number: ", newRand)
    setSelected(newRand);
  }

  // most votes index
  const topIndex = points.reduce((accumulator, current, index) => {
    return current > points[accumulator] ? index : accumulator;
  }, 0);
  console.log("most votes index:", topIndex);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>Has {points[selected]} votes</div>
      <div>
        <Button handleClick={randomGenrator} text="Next anecdote"/>
        <Button handleClick={() => handlePoints(selected)} text="Vote"/>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[topIndex]}
    </div>
  )
}

export default App