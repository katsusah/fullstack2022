const Course = ({ course }) => {
  console.log(course)
  
  return (
    <div>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total exercises = {course.parts.map(part => part.exercises)} />
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
  let total = 0;
  for (let i = 0; i < exercises.length; i++) {
    total += exercises[i];
    console.log('total', total)
  }
  
  return <p><b>total of {total} exercises</b></p>
}
      
export default Course