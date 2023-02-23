const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
};

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.title}</h1>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptive extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescriptive {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDescriptive {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescriptive {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div>
            <p><b>{props.part.name} {props.part.exerciseCount}</b><br />
            <i>{props.part.description}</i></p>
          </div>
        )
      case "background":
        return (
          <div>
            <p><b>{props.part.name} {props.part.exerciseCount}</b><br />
            <i>{props.part.description}</i><br />
            {props.part.backroundMaterial}</p>
          </div>
        )
      case "group":
        return (
          <div>
            <p><b>{props.part.name} {props.part.exerciseCount}</b><br />
            project exercises {props.part.groupProjectCount}</p>
          </div>
        )
      case "special":
        return (
          <div>
            <p><b>{props.part.name} {props.part.exerciseCount}</b><br />
            <i>{props.part.description}</i><br />
            {props.part.requirements}</p>
          </div>
        )
    }
}

interface ContentProps {
  parts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      { props.parts.map((part, index) => (
        <Part key={index.toString()} part={part} />
      ))}
    </div>
  )
};

interface TotalProps {
  parts: CoursePart[]
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
