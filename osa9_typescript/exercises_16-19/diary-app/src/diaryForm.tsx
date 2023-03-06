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
                errorMessage(error.toString());
            }
        }
    }

    return (
        <div>
          <h2>Add new entry:</h2>
            <form onSubmit={submitForm}>
                <label>Date:<br /> 
                    <input type="date" name="date" id='date' onChange={(event) => setDate(event.target.value)}/>
                </label><br /> 
                <label>Visibility:<br />
                <div>
                    <input type="radio" name="visibility" value={Visibility.Great} onChange={(event) => setVisibitily(event.target.value)} />
                    <label >{Visibility.Great}</label>

                    <input type="radio" name="visibility" value={Visibility.Good} onChange={(event) => setVisibitily(event.target.value)} />
                    <label >{Visibility.Good}</label>

                    <input type="radio" name="visibility" value={Visibility.Ok} onChange={(event) => setVisibitily(event.target.value)} />
                    <label >{Visibility.Ok}</label>

                    <input type="radio" name="visibility" value={Visibility.Poor} onChange={(event) => setVisibitily(event.target.value)} />
                    <label >{Visibility.Poor}</label>
                    </div>
                </label><br />
                <label>Weather:
                <div>
                    <input type="radio" name="weather" value={Weather.Sunny} onChange={(event) => setWeather(event.target.value)} />
                    <label >{Weather.Sunny} </label>

                    <input type="radio" name="weather" value={Weather.Rainy} onChange={(event) => setWeather(event.target.value)} />
                    <label >{Weather.Rainy}</label>

                    <input type="radio" name="weather" value={Weather.Cloudy} onChange={(event) => setWeather(event.target.value)} />
                    <label >{Weather.Cloudy}</label>

                    <input type="radio" name="weather" value={Weather.Stormy} onChange={(event) => setWeather(event.target.value)} />
                    <label >{Weather.Stormy}</label>

                    <input type="radio" name="weather" value={Weather.Windy} onChange={(event) => setWeather(event.target.value)} />
                    <label >{Weather.Windy}</label>
                    </div> 
                </label><br />
                <label>Comment:</label><br />
                <input id="comment" value={comment} onChange={(event) => setComment(event.target.value)} /><br />
                <button type='submit'>Add Entry</button>
            </form>
        </div>
    )
  }

export default DiaryForm
