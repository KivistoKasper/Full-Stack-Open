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
      <p>{props.pair.name}: {props.pair.exercises}</p>
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
      Number of exercises: {props.total[0].exercises+
                            props.total[1].exercises+
                            props.total[2].exercises} 
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]
  //console.log(parts)

  return (
    <div>
      <Header course={course}/>
      <Content arr={parts}/>
      <Total total={parts}/>
    </div>
  )
}

export default App