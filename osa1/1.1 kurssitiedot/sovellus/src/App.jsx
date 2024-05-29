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

const Part = (props) => {
  //console.log(props.arr)
  return (
    <div>
      <p>{props.pair.part}: {props.pair.num}</p>
    </div>
  )
}

const Content = (props) => {
  //console.log(props.arr)
  return (
    <div>
      <Part pair={props.arr[0]}/>
      <Part pair={props.arr[1]}/>
      <Part pair={props.arr[2]}/>
    </div>
  )
}

const Total = (props) => {
  //console.log(props)
  return (
    <div>
      <p> 
      Number of exercises: {props.total[0]+props.total[1]+props.total[2]} 
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
      <Total total={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App