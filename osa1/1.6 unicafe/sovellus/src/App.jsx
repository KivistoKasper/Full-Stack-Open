import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  if (props.isPresentage === 1){
    return(
      <div> 
        {props.text}: {props.value} %
      </div>
    )
  }
  return(
    <div> 
      {props.text}: {props.value}
    </div>
  )
}

const Statistics = (props) => {
  if (props.all === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <StatisticLine text="Good" value={props.good} isPresentage={0}/>
      <StatisticLine text="Neutral" value={props.neutral} isPresentage={0}/>
      <StatisticLine text="Bad" value={props.bad} isPresentage={0}/>
      <StatisticLine text="All" value={props.all} isPresentage={0}/>
      <StatisticLine text="Average" value={props.average} isPresentage={0}/>
      <StatisticLine text="Positive" value={props.positive} isPresentage={1}/>
    </div> 
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
      <Statistics good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average}
      positive={positive}
      />
      
    </div>
  )
}

export default App