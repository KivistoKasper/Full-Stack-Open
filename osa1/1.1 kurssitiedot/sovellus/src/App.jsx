const Header = (props) => {
  //console.log(props)
  return (
    <div>
      <h1> 
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props.arr)
  return (
    <div>
      <p>{props.arr[0].part}: {props.arr[0].num}</p>
      <p>{props.arr[1].part}: {props.arr[1].num}</p>
      <p>{props.arr[2].part}: {props.arr[2].num}</p>
    </div>
  )
}

const Total = (props) => {
  //console.log(props)
  return (
    <div>
      <p> 
      Number of exercises: {props.total} 
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {part: part1, num: exercises1},
    {part: part2, num: exercises2},
    {part: part3, num: exercises3},
  ]
  //console.log(parts)

  return (
    <div>
      <Header course={course}/>
      <Content arr={parts}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App