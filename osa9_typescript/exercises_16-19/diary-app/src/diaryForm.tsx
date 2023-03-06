import { addNewDiary } from "./diaryService"
import { Weather, Visibility, DiaryEntry } from "./types";
import { useState } from "react";

interface diaryFormProps {
    entries: DiaryEntry[];
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
    errorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryForm = (props: diaryFormProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibitily] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const {entries, setEntries, errorMessage} = props;

    const submitForm = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diaryToAdd = {
            date: date,
            visibility: visibility as Visibility,
            weather: weather as Weather,
            comment: comment
        }
        try {
            const result = await addNewDiary(diaryToAdd)
            if (result) {
                setEntries(entries.concat(result));
                setDate('');
                setVisibitily('');
                setWeather('');
                setComment('');
            }
        } catch (error) {
            if (error instanceof Error) {
                // const message = "" + error;
                errorMessage(error.toString());
            }
        }
        
    }

    return (
        <div>
          <h2>Add new entry:</h2>
            <form onSubmit={submitForm}>
                <label>Date:</label><br />
                <input id='date' value={date} onChange={(event) => setDate(event.target.value)} /><br />
                <label>Visibility:</label><br />
                <input id="visibility" value={visibility} onChange={(event) => setVisibitily(event.target.value)} /><br />
                <label>Weather:</label><br />
                <input id="weather" value={weather} onChange={(event) => setWeather(event.target.value)} /><br />
                <label>Comment:</label><br />
                <input id="comment" value={comment} onChange={(event) => setComment(event.target.value)} /><br />
                <button type='submit'>Add Entry</button>
            </form>
        </div>
    )
  }

export default DiaryForm