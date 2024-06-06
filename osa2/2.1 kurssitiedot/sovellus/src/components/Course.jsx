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
  
  const Course = ({courses}) => {
    //console.log('Courses: ', courses)
    return(
      <div>
        {courses.map(course => 
          <div  key={course.id}>
            <Header course={course.name}/>
            <Content arr={course.parts}/>
            <Total arr={course.parts}/>
          </div>
        )}
      </div>
    )
  }
  
  export default Course