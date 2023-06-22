import Course from './components/Course'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        id: 1,
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        id: 2,
        exercises: 7
      },
      {
        name: 'State of a component',
        id: 3,
        exercises: 14
      },
      {
        name: 'Redux',
        id: 4,
        exercises: 11
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