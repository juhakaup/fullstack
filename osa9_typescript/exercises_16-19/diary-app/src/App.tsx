import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import axios from "axios";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setEntries(response.data);
    })
  },[]);

  return (
    <div>
      <h2>Diaries:</h2>
        { entries.map(entry => (
          <EntryBlock key={entry.id} entry={entry}/>
        ))}
    </div>
  );
}

interface entryBlockProps {
  entry: DiaryEntry
}

const EntryBlock = (props: entryBlockProps) => {
  const entry = props.entry;
  return (
    <>
    <h3>{ entry.date }</h3>
    visibility: { entry.visibility } <br />
    weather: { entry.weather }
    </>
  )
}

export default App;
