import axios from "axios";
import { DiaryEntry, newDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data);
}

export const addNewDiary = async (newEntry: newDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, newEntry)
        .then(response => response.data)
}