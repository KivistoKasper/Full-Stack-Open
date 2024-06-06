const Header = (props) => {
  //console.log(props.course)
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
  /*
      <Part pair={props.arr[0]}/>
      <Part pair={props.arr[1]}/>
      <Part pair={props.arr[2]}/>
  */
  return (
    <div>
        {props.arr.map(part => <Part key={part.id} pair={part}/>)}
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

const Course = props => {
  //console.log('Course: ', props)
  return(
    <div>
    <Header course={props.course.name}/>
    <Content arr={props.course.parts}/>
    
  </div>
  //<Total total={props.parts}/>
  )
  
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
      
      

export default App