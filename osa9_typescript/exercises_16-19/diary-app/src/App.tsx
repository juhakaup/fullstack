import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from './diaryService';
import DiaryForm from "./diaryForm";


function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setEntries(data);
    })
  },[]);

  return (
    <div>
      <DiaryForm entries={entries} setEntries={setEntries}/>
      <h2>Diaries:</h2>
        { entries.map(entry => (
          <Entry key={entry.id} entry={entry}/>
        ))}
    </div>
  );
}

interface entryProps {
  entry: DiaryEntry
}

const Entry = (props: entryProps) => {
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
