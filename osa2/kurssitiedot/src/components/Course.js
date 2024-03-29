const Course = ({ course }) => {
  console.log(course)
  
  return (
    <div>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total exercises = {course.parts.map(part => 
            part.exercises
            )}
        />
    </div>
  )
}
    
const Header = ({ name }) => {
  return <h1>{name}</h1>
}
    
const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}
        
const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const Total = ({ exercises }) => {
  console.log(exercises)
  const total = exercises.reduce( (sum, currentValue) => {
    console.log('what is happening', sum, currentValue)
    return sum + currentValue })
  return <p><b>total of {total} exercises</b></p>
}

export default Course