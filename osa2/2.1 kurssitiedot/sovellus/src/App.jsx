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
  //console.log('Courses: ', props)
  return(
    <div>
      {props.courses.map(course => 
        <div  key={course.id}>
          <Header course={course.name}/>
          <Content arr={course.parts}/>
          <Total arr={course.parts}/>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}
      
      

export default App