import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from './diaryService';
import DiaryForm from "./diaryForm";


function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setEntries(data);
    })
  },[]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 5000)
  }, [errorMessage])

  return (
    <div>
      <p style={{color:"red"}}>{errorMessage}</p>
      <DiaryForm entries={entries} setEntries={setEntries} errorMessage={setErrorMessage}/>
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
