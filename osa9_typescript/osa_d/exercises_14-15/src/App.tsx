const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
};

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.title}</h1>;
}

interface ContentParts {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: ContentParts[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      { props.parts.map((part, index) => (
        <p key={index.toString()} >
          { part.name } { part.exerciseCount }
        </p>
      ))}
    </div>
  )
};

interface TotalProps {
  parts: ContentParts[]
}

const Total = (props: TotalProps) => {
  return (
    <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
};

export default App;
