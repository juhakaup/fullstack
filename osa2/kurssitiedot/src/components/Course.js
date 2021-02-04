const Course = ( {course} ) => {
    // console.log(course)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course

  const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.course}</h1>
    )
  }

  const Content = (props) => {
    // console.log(props)
    return (
      <>
      {props.parts.map(part => 
        <Part name={part.name} exercises={part.exercises}/>
      )}
      </>
    )
  }
  
  const Total = (props) => {
    const sum = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p><b>total of {sum} exercises</b></p>
    )
  }

  const Part = ( {name, exercises} ) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }