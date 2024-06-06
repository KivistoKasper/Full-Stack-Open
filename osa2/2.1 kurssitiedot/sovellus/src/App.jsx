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
  return (
    <div>
        {props.arr.map(part => <Part key={part.id} pair={part}/>)}
    </div>
  )
}

const Total = (props) => {
  //console.log(props)
  const total = props.arr.reduce(
    (sum, part) => sum + part.exercises, 0
  );
  return (
    <div>
      <p> 
        <b>Total of {total} exercises</b>
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
    <Total arr={props.course.parts}/>
    
  </div>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
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