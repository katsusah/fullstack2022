const Course = ({ course }) => { 
    console.log(course)

    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
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
        
    const Part = (props) => {
      return <p>{props.name} {props.exercises}</p>
    }
    
    export default Course