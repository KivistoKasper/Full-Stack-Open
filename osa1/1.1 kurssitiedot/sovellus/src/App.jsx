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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  //console.log(parts)

  return (
    <div>
      <Header course={course.name}/>
      <Content arr={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App