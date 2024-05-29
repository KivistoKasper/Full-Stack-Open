import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const newGood = good+1
    setGood(newGood)
    const newAll = all+1
    setAll(newAll)
    calculateStatistics(newGood, neutral, bad, newAll);
  }
  const increaseNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
    const newAll = all+1
    setAll(newAll)
    calculateStatistics(good, newNeutral, bad, newAll);
  }
  const increaseBad = () => {
    const newBad = bad+1
    setBad(newBad)
    const newAll = all+1
    setAll(newAll)
    calculateStatistics(good, neutral, newBad, newAll);
  }

  const calculateStatistics = (good, neutral, bad, all) => {
    const average = (good - bad) / all;
    const positive = (good / all) * 100;
    setAverage(average);
    setPositive(positive);
  };

  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick={increaseGood} text="Good"/>
      <Button handleClick={increaseNeutral} text="Neutral"/>
      <Button handleClick={increaseBad} text="Bad"/>

      <h1>statistics</h1>

      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All: {all}</div>
      <div>Average: {average}</div>
      <div>Positive: {positive}</div>
    </div>
  )
}

export default App